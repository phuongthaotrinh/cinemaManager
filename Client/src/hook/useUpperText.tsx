const useUpperText = () => {

   const upper = (text: any) => {
      let data = (text.trim()).toUpperCase()
      return data
   };
   
   return { upper}
}

export default useUpperText