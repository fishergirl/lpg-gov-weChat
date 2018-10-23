
export function config() {
  const dva_initState = sessionStorage.getItem('dva_initState');
  let initialState = {};
  if(dva_initState){
    initialState = JSON.parse(dva_initState);
  }
  // console.log(initialState)
  return {
    onError(err) {
      err.preventDefault && err.preventDefault();
      console.log({...err},'全局错误处理')
    },
    initialState:{
      global:initialState
    },
  };
}
