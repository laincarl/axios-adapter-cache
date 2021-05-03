import settle from 'axios/lib/core/settle';
import defaultAdapter from 'axios/lib/adapters/xhr';

const pending = new Map();
function getKey(config) {
  // TODO 标识请求的逻辑
  return config.url
}
export default function reusePendingRequestAdapter(config) {
  const key = config.url;
  console.log(config)
  if (pending.has(key)) {
    return new Promise((resolve, reject) => {
      const item = pending.get(key)
      item.resolveCallbacks.push(resolve)
      item.rejectCallbacks.push(reject)
    })
  } else {
    pending.set(key, {
      resolveCallbacks: [],
      rejectCallbacks: [],
    })
    return new Promise((resolve, reject) => {
      defaultAdapter(config).then((response) => {
        if (pending.has(key)) {
          pending.get(key).resolveCallbacks.forEach((callback) => callback(response))
          pending.delete(key)
        }
        resolve(response)
      }).catch((error) => {
        if (pending.has(key)) {
          pending.get(key).rejectCallbacks.forEach((callback) => callback(error))
          pending.delete(key)
        }
        reject(error)
      })
    })
  }
}