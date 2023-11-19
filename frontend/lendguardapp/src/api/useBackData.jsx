export async function updateSettings(address,health_ratio_notification, health_ratio_execution, target_health_ratio) {
    try {
      const response = await fetch(process.env.REACT_APP_BACK_URL + "/update_settings_healths", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address: address, health_ratio_notification: health_ratio_notification, health_ratio_execution: health_ratio_execution, target_health_ratio: target_health_ratio }),
      });
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error("Error fetching table data from API:", error);
    }
}


export async function getSettings(address) {
    try {
      const response = await fetch(process.env.REACT_APP_BACK_URL + "/get_setting/" + address, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error("Error fetching table data from API:", error);
    }
  }