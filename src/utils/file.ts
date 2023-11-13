import "/@/plugins/spark-md5.js";

export const useFileHash = async (file) => {
  return await getFileInfo(file);
};

// 将 File 对象转为 ArrayBuffer
function fileToBuffer(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error("转换文件格式发生错误"));
    }
    const fr = new FileReader();
    fr.onload = (e) => {
      resolve(e.target?.result);
    };
    fr.readAsArrayBuffer(file);
    fr.onerror = () => {
      reject(new Error("转换文件格式发生错误"));
    };
  });
}

// 文件信息
async function getFileInfo(file) {
    const name = file?.name;
    const format = /\.([0-9A-z]+)$/.exec(file?.name)?.[1];
    const size = file?.size;
    const md5Hex = await getHashByFile(file);
    return {
      name,
      format,
      md5Hex,
      size,
    }
}

// 根据buffer生成hash
function getHash(buffer) {
  const spark = new SparkMD5.ArrayBuffer();
  spark.append(buffer);
  const hash = spark.end();
  return hash;
}

// 根据文件生成hash
async function getHashByFile(file) {
    const buffer = await fileToBuffer(file);
    const hash = getHash(buffer);
    return hash
}
