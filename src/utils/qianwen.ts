interface QianwenResponse {
  output: {
    text: string;
  };
  usage: {
    total_tokens: number;
  };
}

export const generateNamesWithQianwen = async (
  baziInfo: string,
  gender: string,
  style: string
): Promise<Array<{ name: string; meaning: string; source: string }>> => {
  const prompt = `作为一个专业的中国取名专家，请根据以下条件生成3个合适的中文名字：

${baziInfo}

性别：${gender}
期望风格：${style}

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
    const response = await fetch(import.meta.env.VITE_QIANWEN_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_QIANWEN_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'qwen-max',
        input: {
          messages: [
            {
              role: 'system',
              content: '你是一个精通中国传统文化、易经八字和起名的专家。'
            },
            {
              role: 'user',
              content: prompt
            }
          ]
        }
      })
    });

    if (!response.ok) {
      throw new Error('通义千问API请求失败');
    }

    const data: QianwenResponse = await response.json();
    const content = data.output.text;
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
    console.error('Qianwen API error:', error);
    throw new Error('生成名字时出现错误，请稍后重试');
  }
};