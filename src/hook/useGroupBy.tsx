import { formatDate, formatTime } from '../ultils';
type Props = {}

const useGroupBy = () => {

   const groupByTime = (data: any, conditon: any) => {
      const groupByTimeFn = data?.reduce((acc: any, arrayItem: any) => {
         let rowName = formatTime(arrayItem[conditon]);
         if (acc[rowName] == null) { acc[rowName] = []; }
         acc[rowName].push(arrayItem);
         return acc;
      }, {});
      return groupByTimeFn;
   };
   const groupByDate = (dataDate: any) => {
      const groupByDateFn = dataDate?.reduce((acc: any, arrayItem: any) => {
         let rowName = formatDate(arrayItem["date"]);
         if (acc[rowName] == null) {
            acc[rowName] = [];
         }
         acc[rowName].push(arrayItem);
         return acc;
      }, {});
      return groupByDateFn;
   };

   const groupByRow = (arr: any) => {
      const groupByRowName = arr?.reduce((acc: any, arrayItem: any) => {
         let rowName = (arrayItem["row"]);
         if (acc[rowName] == null) { acc[rowName] = [] }
         acc[rowName].push(arrayItem);
         return acc;
      }, {});
      return groupByRowName;
   };

   return { groupByTime, groupByDate, groupByRow }
}

export default useGroupBy