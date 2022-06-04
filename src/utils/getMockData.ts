export interface ListItem {
  id: number;
  data: string;
}

export function timeout(delay = 300) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(delay);
    }, delay);
  });
}

const addListItems = (start = 0, count = 15) => {
  const list: ListItem[] = [];
  const end = start + count;
  console.log(`start is ${start},end is ${end}`);
  for (let i = start; i < end; i++) {
    list.push({
      id: i,
      data: `This is list mock data -- item${i + 1}`
    });
  }
  return list;
};

export const mockGetListData = async (pageIndex = 0, pageSize = 20, timeDealy = 1000) => {
  const res = await timeout(timeDealy);
  console.log(`get time: ${res}`);
  return addListItems(pageIndex, pageSize);
};
