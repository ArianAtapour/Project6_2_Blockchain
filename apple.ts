type AppleCount = {
    type: string;
    count: number;
  };
  
  // Function to count apples
  function countApples(appleList: string[]): AppleCount[] { //takes an array of apple types and returns an array 
    const appleCounts: AppleCount[] = [];
    appleList.forEach((appleType) => {                     // check apple type 
      const existingApple = appleCounts.find((a) => a.type === appleType);
      if (existingApple) {
        existingApple.count++;
      } else {
        appleCounts.push({ type: appleType, count: 1 });
      }
    });
    return appleCounts;
  }
  
  // Example usage
  const appleList = ['Granny Smith', 'Fuji', 'Granny Smith', 'Fuji'];
  const appleCounts = countApples(appleList);
  console.log(appleCounts);
 