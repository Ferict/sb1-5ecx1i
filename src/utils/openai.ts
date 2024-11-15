import OpenAI from 'openai';
import type { BaziResult } from './bazi';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  baseURL: import.meta.env.VITE_OPENAI_API_BASE_URL,
  dangerouslyAllowBrowser: true
});

export const generateNames = async (
  baziResult: BaziResult,
  gender: string,
  style: string
): Promise<Array<{ name: string; meaning: string; source: string }>> => {
  const prompt = `作为一个专业的中国取名专家，请根据以下条件生成3个合适的中文名字：

生辰八字：
年柱：${baziResult.year}（${baziResult.yearElement}）
月柱：${baziResult.month}（${baziResult.monthElement}）
日柱：${baziResult.day}（${baziResult.dayElement}）
时柱：${baziResult.hour}（${baziResult.hourElement}）

性别：${gender}
期望风格：${style}

命理分析建议：${baziResult.luck.join('；')}

请按照以下格式返回结果：
名字1：含义1：出处1
名字2：含义2：出处2
名字3：含义3：出处3

要求：
1. 名字要契合八字五行
2. 考虑音律优美
3. 寓意积极向上
4. 符合${style}的文学风格
5. 适合${gender}性使用
6. 提供准确的出处`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "你是一个精通中国传统文化、易经八字和起名的专家。"
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.8,
    });

    const content = response.choices[0].message.content || '';
    const namesList = content.split('\n').filter(line => line.trim());
    
    return namesList.map(nameInfo => {
      const [name, meaning, source] = nameInfo.split('：');
      return {
        name: name.replace(/[0-9]/g, '').trim(),
        meaning: meaning?.trim() || '',
        source: source?.trim() || ''
      };
    });
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('生成名字时出现错误，请稍后重试');
  }
};