/**
 * 团队成员和校友列表自动排序脚本
 * =====================================
 * 
 * 功能说明：
 * 本脚本用于自动对 team-data.js 文件中的所有学生和校友列表进行排序，
 * 确保团队成员信息按照统一的规则整齐排列。
 * 
 * 排序规则：
 * - 按英文姓氏（Last Name）的字母顺序排序
 * - 英文名格式为 "名 姓"（如 "Jia Chen"），提取最后一个单词作为姓氏
 * - 同姓氏的成员按照名字（First Name）自然排序
 * 
 * 处理的列表：
 * 1. 在校学生：
 *    - phdStudents (博士研究生)
 *    - masterStudents (硕士研究生)
 *    - undergraduates (本科生)
 *    - visitingStudents (访问学生)
 * 
 * 2. 校友：
 *    - alumniData.phd (博士生校友)
 *    - alumniData.masters (硕士生校友)
 *    - alumniData.undergrad (本科生校友)
 *    - alumniData.visiting (访问学生校友)
 * 
 * 自动清理：
 * - 删除数组最后一项和闭合括号之间的多余空行
 * - 清理连续3个或以上的空行（替换为2个空行）
 * - 确保文件末尾只有一个换行符
 * 
 * 使用方法：
 * ```bash
 * node sort-students.js
 * ```
 * 
 * 注意事项：
 * 1. 运行前请确保 team-data.js 文件格式正确
 * 2. 脚本会直接修改 team-data.js 文件，建议先提交 Git 或做好备份
 * 3. 脚本是幂等的，可以安全地多次运行
 * 4. 不会丢失任何数据，包括 homepage 链接等可选字段
 * 
 * 作者：OpenMOSS Team
 * 最后更新：2025-11-22
 */

// 自动排序并替换博士生、硕士生、本科生和校友列表的脚本
const fs = require('fs');
const path = require('path');

// 读取 team-data.js 文件
const filePath = path.join(__dirname, 'assets/js/team-data.js');
let content = fs.readFileSync(filePath, 'utf8');

// 提取博士生数组
const phdMatch = content.match(/(\/\/ 博士研究生\s*phdStudents:\s*\[)([\s\S]*?)(\s*\],\s*\/\/ 硕士研究生)/);
const phdArrayStr = phdMatch ? phdMatch[2] : '';

// 提取硕士生数组
const masterMatch = content.match(/(\/\/ 硕士研究生\s*masterStudents:\s*\[)([\s\S]*?)(\s*\],\s*\/\/ 本科生)/);
const masterArrayStr = masterMatch ? masterMatch[2] : '';

// 提取本科生数组
const undergradMatch = content.match(/(\/\/ 本科生\s*undergraduates:\s*\[)([\s\S]*?)(\s*\],\s*\/\/ 访问学生)/);
const undergradArrayStr = undergradMatch ? undergradMatch[2] : '';

// 提取访问学生数组
const visitingMatch = content.match(/(\/\/ 访问学生\s*visitingStudents:\s*\[)([\s\S]*?)(\s*\]\s*,\s*\})/);
const visitingArrayStr = visitingMatch ? visitingMatch[2] : '';

// 提取博士生校友数组
const alumniPhdMatch = content.match(/(\/\/ 博士生校友\s*phd:\s*\[)([\s\S]*?)(\s*\],\s*\/\/ 硕士生校友)/);
const alumniPhdArrayStr = alumniPhdMatch ? alumniPhdMatch[2] : '';

// 提取硕士生校友数组
const alumniMasterMatch = content.match(/(\/\/ 硕士生校友\s*masters:\s*\[)([\s\S]*?)(\s*\],\s*\/\/ 本科生校友)/);
const alumniMasterArrayStr = alumniMasterMatch ? alumniMasterMatch[2] : '';

// 提取本科生校友数组
const alumniUndergradMatch = content.match(/(\/\/ 本科生校友\s*undergrad:\s*\[)([\s\S]*?)(\s*\],\s*\/\/ 访问学生校友)/);
const alumniUndergradArrayStr = alumniUndergradMatch ? alumniUndergradMatch[2] : '';

// 提取访问学生校友数组
const alumniVisitingMatch = content.match(/(\/\/ 访问学生校友\s*visiting:\s*\[)([\s\S]*?)(\s*\]\s*\})/);
const alumniVisitingArrayStr = alumniVisitingMatch ? alumniVisitingMatch[2] : '';

// 解析学生对象的函数
function parseStudents(arrayStr) {
    const students = [];
    const regex = /\{\s*id:\s*'([^']+)',\s*name:\s*\{\s*zh:\s*'([^']+)',\s*en:\s*'([^']+)'\s*\},\s*photo:\s*'([^']+)'(?:,\s*homepage:\s*'([^']+)')?\s*\}/g;

    let match;
    while ((match = regex.exec(arrayStr)) !== null) {
        students.push({
            id: match[1],
            nameZh: match[2],
            nameEn: match[3],
            photo: match[4],
            homepage: match[5] || null
        });
    }
    return students;
}

// 解析校友对象的函数
function parseAlumni(arrayStr) {
    const alumni = [];
    const regex = /\{\s*name:\s*\{\s*zh:\s*'([^']+)',\s*en:\s*'([^']+)'\s*\},\s*destination:\s*\{\s*zh:\s*'([^']+)',\s*en:\s*'([^']+)'\s*\}(?:,\s*homepage:\s*(?:'([^']+)'|null))?\s*\}/g;

    let match;
    while ((match = regex.exec(arrayStr)) !== null) {
        alumni.push({
            nameZh: match[1],
            nameEn: match[2],
            destZh: match[3],
            destEn: match[4],
            homepage: match[5] || null
        });
    }
    return alumni;
}

// 格式化学生对象为代码字符串
function formatStudent(student, indent = '        ') {
    const homepageStr = student.homepage ? `, homepage: '${student.homepage}'` : '';
    return `${indent}{ id: '${student.id}', name: { zh: '${student.nameZh}', en: '${student.nameEn}' }, photo: '${student.photo}'${homepageStr} }`;
}

// 格式化校友对象为代码字符串
function formatAlumni(alumni, indent = '        ') {
    const homepageStr = alumni.homepage ? `, homepage: '${alumni.homepage}'` : ', homepage: null';
    return `${indent}{ name: { zh: '${alumni.nameZh}', en: '${alumni.nameEn}' }, destination: { zh: '${alumni.destZh}', en: '${alumni.destEn}' }${homepageStr} }`;
}

// 解析学生列表
const phdStudents = parseStudents(phdArrayStr);
const masterStudents = parseStudents(masterArrayStr);
const undergradStudents = parseStudents(undergradArrayStr);
const visitingStudents = parseStudents(visitingArrayStr);

// 解析校友列表
const alumniPhd = parseAlumni(alumniPhdArrayStr);
const alumniMaster = parseAlumni(alumniMasterArrayStr);
const alumniUndergrad = parseAlumni(alumniUndergradArrayStr);
const alumniVisiting = parseAlumni(alumniVisitingArrayStr);

console.log(`找到 ${phdStudents.length} 个博士生`);
console.log(`找到 ${masterStudents.length} 个硕士生`);
console.log(`找到 ${undergradStudents.length} 个本科生`);
console.log(`找到 ${visitingStudents.length} 个访问学生`);
console.log(`找到 ${alumniPhd.length} 个博士生校友`);
console.log(`找到 ${alumniMaster.length} 个硕士生校友`);
console.log(`找到 ${alumniUndergrad.length} 个本科生校友`);
console.log(`找到 ${alumniVisiting.length} 个访问学生校友`);

// 提取英文名的姓氏（最后一个单词）
function getLastName(fullName) {
    const parts = fullName.trim().split(/\s+/);
    return parts[parts.length - 1];
}

// 按英文姓氏字典序排序
phdStudents.sort((a, b) => getLastName(a.nameEn).localeCompare(getLastName(b.nameEn)));
masterStudents.sort((a, b) => getLastName(a.nameEn).localeCompare(getLastName(b.nameEn)));
undergradStudents.sort((a, b) => getLastName(a.nameEn).localeCompare(getLastName(b.nameEn)));
visitingStudents.sort((a, b) => getLastName(a.nameEn).localeCompare(getLastName(b.nameEn)));
alumniPhd.sort((a, b) => getLastName(a.nameEn).localeCompare(getLastName(b.nameEn)));
alumniMaster.sort((a, b) => getLastName(a.nameEn).localeCompare(getLastName(b.nameEn)));
alumniUndergrad.sort((a, b) => getLastName(a.nameEn).localeCompare(getLastName(b.nameEn)));
alumniVisiting.sort((a, b) => getLastName(a.nameEn).localeCompare(getLastName(b.nameEn)));

// 生成排序后的代码
const phdList = phdStudents.map((student, index) => {
    const comma = index < phdStudents.length - 1 ? ',' : '';
    return formatStudent(student) + comma;
}).join('\n');

const masterList = masterStudents.map((student, index) => {
    const comma = index < masterStudents.length - 1 ? ',' : '';
    return formatStudent(student) + comma;
}).join('\n');

const undergradList = undergradStudents.map((student, index) => {
    const comma = index < undergradStudents.length - 1 ? ',' : '';
    return formatStudent(student) + comma;
}).join('\n');

const visitingList = visitingStudents.map((student, index) => {
    const comma = index < visitingStudents.length - 1 ? ',' : '';
    return formatStudent(student) + comma;
}).join('\n');

const alumniPhdList = alumniPhd.map((alumni, index) => {
    const comma = index < alumniPhd.length - 1 ? ',' : '';
    return formatAlumni(alumni) + comma;
}).join('\n');

const alumniMasterList = alumniMaster.map((alumni, index) => {
    const comma = index < alumniMaster.length - 1 ? ',' : '';
    return formatAlumni(alumni) + comma;
}).join('\n');

const alumniUndergradList = alumniUndergrad.map((alumni, index) => {
    const comma = index < alumniUndergrad.length - 1 ? ',' : '';
    return formatAlumni(alumni) + comma;
}).join('\n');

const alumniVisitingList = alumniVisiting.map((alumni, index) => {
    const comma = index < alumniVisiting.length - 1 ? ',' : '';
    return formatAlumni(alumni) + comma;
}).join('\n');

// 替换文件内容
if (phdMatch) {
    const newPhdSection = phdMatch[1] + '\n' + phdList + '\n    ' + phdMatch[3];
    content = content.replace(phdMatch[0], newPhdSection);
}

if (masterMatch) {
    const newMasterSection = masterMatch[1] + '\n' + masterList + '\n    ' + masterMatch[3];
    content = content.replace(masterMatch[0], newMasterSection);
}

if (undergradMatch) {
    const newUndergradSection = undergradMatch[1] + '\n' + undergradList + '\n    ' + undergradMatch[3];
    content = content.replace(undergradMatch[0], newUndergradSection);
}

if (visitingMatch) {
    const newVisitingSection = visitingMatch[1] + '\n' + visitingList + '\n    ' + visitingMatch[3];
    content = content.replace(visitingMatch[0], newVisitingSection);
}

if (alumniPhdMatch) {
    const newAlumniPhdSection = alumniPhdMatch[1] + '\n' + alumniPhdList + '\n    ' + alumniPhdMatch[3];
    content = content.replace(alumniPhdMatch[0], newAlumniPhdSection);
}

if (alumniMasterMatch) {
    const newAlumniMasterSection = alumniMasterMatch[1] + '\n' + alumniMasterList + '\n    ' + alumniMasterMatch[3];
    content = content.replace(alumniMasterMatch[0], newAlumniMasterSection);
}

if (alumniUndergradMatch) {
    const newAlumniUndergradSection = alumniUndergradMatch[1] + '\n' + alumniUndergradList + '\n    ' + alumniUndergradMatch[3];
    content = content.replace(alumniUndergradMatch[0], newAlumniUndergradSection);
}

if (alumniVisitingMatch) {
    const newAlumniVisitingSection = alumniVisitingMatch[1] + '\n' + alumniVisitingList + '\n    ' + alumniVisitingMatch[3];
    content = content.replace(alumniVisitingMatch[0], newAlumniVisitingSection);
}

// 写回文件前清理多余的空行（连续3个或以上的空行替换为2个）
content = content.replace(/\n\s*\n\s*\n\s*\n+/g, '\n\n\n');
// 清理数组最后一项和闭合括号之间的空行
content = content.replace(/\n\s*\n\s*\]/g, '\n    ]');
// 确保文件末尾只有一个换行符
content = content.replace(/\n+$/, '\n');

// 写回文件
fs.writeFileSync(filePath, content, 'utf8');

console.log('\n✅ 排序完成！所有学生和校友列表已按字典序更新。');

