import { Lunar } from 'lunar-typescript';

export interface BaziResult {
  year: string;
  month: string;
  day: string;
  hour: string;
  yearElement: string;
  monthElement: string;
  dayElement: string;
  hourElement: string;
  luck: string[];
}

const elements = {
  '甲': '木', '乙': '木',
  '丙': '火', '丁': '火',
  '戊': '土', '己': '土',
  '庚': '金', '辛': '金',
  '壬': '水', '癸': '水'
};

export const calculateBazi = (birthDate: Date, birthHour: number): BaziResult => {
  const lunar = Lunar.fromDate(birthDate);
  const baziDate = lunar.getBaZi();
  
  // 获取八字
  const [year, month, day, hour] = baziDate;
  
  // 计算五行属性
  const yearElement = elements[year[0]] || '';
  const monthElement = elements[month[0]] || '';
  const dayElement = elements[day[0]] || '';
  const hourElement = elements[hour[0]] || '';
  
  // 简单的命理分析（实际项目中可以扩展更复杂的分析）
  const luck = analyzeBazi(yearElement, monthElement, dayElement, hourElement);
  
  return {
    year,
    month,
    day,
    hour,
    yearElement,
    monthElement,
    dayElement,
    hourElement,
    luck
  };
};

const analyzeBazi = (year: string, month: string, day: string, hour: string): string[] => {
  const elements = [year, month, day, hour];
  const analysis = [];
  
  // 五行分布分析
  const elementCount = elements.reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // 根据五行分布提供建议
  if (elementCount['木'] >= 2) analysis.push('木气旺盛，建议取名可选用金或土属性字');
  if (elementCount['火'] >= 2) analysis.push('火气旺盛，建议取名可选用水或金属性字');
  if (elementCount['土'] >= 2) analysis.push('土气旺盛，建议取名可选用木或火属性字');
  if (elementCount['金'] >= 2) analysis.push('金气旺盛，建议取名可选用火或土属性字');
  if (elementCount['水'] >= 2) analysis.push('水气旺盛，建议取名可选用土或木属性字');
  
  return analysis;
};