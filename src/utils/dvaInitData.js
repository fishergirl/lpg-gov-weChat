const dva_initState = sessionStorage.getItem('dva_initState');
let initialState = {};
if(dva_initState){
  initialState = JSON.parse(dva_initState);
  for (let k in initialState) {
    if(!initialState[k] || (typeof initialState[k] === 'object' && Object.keys(initialState[k]).length === 0)){
      delete initialState[k]
    }
  }
}
export default initialState;
