
export function config() {

  return {
    onError(err) {
      err.preventDefault && err.preventDefault();
      console.log({...err},'全局错误处理')
    },
  };
}
