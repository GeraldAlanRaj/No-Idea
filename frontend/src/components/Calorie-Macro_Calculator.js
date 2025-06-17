import { useEffect, useState } from "react";
import instance from "../utils/axiosInterceptor";

const useCalorieMacroData = (userId, refreshTrigger) => {
  const [nutritionData, setNutritionData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await instance.get(`/profile/${userId}/details-with-calories`);
        setNutritionData(res.data);
      } catch (err) {
        console.error("Error fetching nutrition data:", err);
        setNutritionData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [userId, refreshTrigger]);

  return { nutritionData, loading };
};

export default useCalorieMacroData;
