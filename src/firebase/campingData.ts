import { ref, onValue, getDatabase } from "firebase/database"; // 사용할 모듈

export const campingData = getDatabase();

export const starCountRef = ref(campingData, "response/");
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
  console.log(data);
});
