


// function checkScreenSize() {
//   // ตรวจสอบขนาดหน้าจอ
//   if (window.innerWidth <= 768) { // หากความกว้างมากกว่าหรือเท่ากับ 768px (จำลองความกว้างของแท็บเล็ต)
//     // แสดงข้อความสำหรับคอมพิวเตอร์
//     document.getElementById("desktopMessage").style.display = "block";
//     document.getElementById("desktopMessage").style.display = "block";
//   }
// }


// // เรียกฟังก์ชันตรวจสอบขนาดหน้าจอทันทีเมื่อหน้าจอโหลด
// window.onload = checkScreenSize;

// // เรียกฟังก์ชันตรวจสอบขนาดหน้าจอทุกครั้งที่มีการปรับขนาดหน้าจอ
// window.onresize = checkScreenSize;






document.addEventListener("DOMContentLoaded", function () {
  var hot = new Handsontable(
    document.getElementById("handsontable-container"),
    {
      data: [
        [
          "jf3pomq1a",
          0.001,
          "SELL",
          1.44963,
          1.4375,
          12.13,
          121.3,
          "2010-01-14 22:52:30",
          "2010-01-15 13:52:30",
        ],
        [
          "jf5ss6yre",
          0.001,
          "SELL",
          1.4152081,
          1.40795,
          7.26,
          72.6,
          "2010-01-24 23:52:30",
          "2010-01-26 11:52:30",
        ],
        [
          "jf17zgc71",
          0.001,
          "SELL",
          1.4014276,
          1.39631,
          5.12,
          51.2,
          "2010-01-28 05:52:30",
          "2010-01-29 07:52:30",
        ],
        [
          "jfxz6us8u",
          0.001,
          "SELL",
          1.3914044,
          1.37405,
          17.35,
          173.5,
          "2010-02-01 13:52:30",
          "2010-02-04 23:52:30",
        ],
        // เพิ่มข้อมูลอื่น ๆ ตามต้องการ
      ],
      columns: [
        { data: "Label", type: "text" },
        { data: "Amount", type: "numeric" },
        { data: "Direction", type: "text" },
        { data: "Open price", type: "numeric" },
        { data: "Close price", type: "numeric" },
        { data: "Profit/Loss", type: "numeric" },
        { data: "Profit/Loss in pips", type: "numeric" },
        { data: "Open date", type: "text", dateFormat: "YYYY-MM-DD" }, //เก็บเป็น Text ปกติแล้วค่อยสปิ๊ตออกมา
        { data: "close date", type: "text", dateFormat: "YYYY-MM-DD" },
        { data: "Comment", type: "text" },
      ],

      rowHeaders: true,
      colHeaders: [
        "Label",
        "Amount",
        "Direction",
        "Open price",
        "Close price",
        "Profit/Loss",
        "Profit/Loss in pips",
        "Open date",
        "Close date",
        "Comment",
      ],

      contextMenu: true,
      autoColumnSize: true,
      width: "100%",
      licenseKey: "non-commercial-and-evaluation",

      afterRender: function () {
        var header = this.rootElement.querySelector(".ht_clone_top thead tr");
        // เพิ่ม class 'col-special' ในทุก <th> ที่ต้องการ
        header.querySelector(":nth-child(7)").classList.add("col-special"); // เช่น, ถ้าต้องการให้คอลัมน์ 'Profit/Loss' มีสีพื้นหลังพิเศษ
        header.querySelector(":nth-child(4)").classList.add("col-special"); // เช่น, ถ้าต้องการให้คอลัมน์ 'Profit/Loss' มีสีพื้นหลังพิเศษ
      },

      cells: function (row, col, prop, value, cellProperties) {
        var cellProperties = {};

        cellProperties.renderer = function (
          instance,
          td,
          row,
          col,
          prop,
          value,
          cellProperties
        ) {
          Handsontable.renderers.TextRenderer.apply(this, arguments);

          // ถ้าเป็นคอลัมน์ 'Profit/Loss' (col ที่ 5)
          if (col === 5) {
            if (value < 0) {
              td.style.color = "red";
              td.style.textAlign = "right"; // ตั้งสีเป็นแดงสำหรับค่าลบ
            } else {
              td.style.color = "green";
              td.style.textAlign = "right"; // ตั้งสีเป็นเขียวสำหรับค่าบวก
            }
            // กำหนดสีพื้นหลังพร้อมความโปร่งแสง (opacity) 50%
            td.style.backgroundColor = "rgb(122,196,173,0.3)";
          }
          if (col === 2) {
            // กำหนดสีพื้นหลังพร้อมความโปร่งแสง (opacity) 50%
            td.style.backgroundColor = "rgb(122,196,173,0.3)";
          }
        };

        return cellProperties;
      },
    }
  );

  let apexChart;

  document
    .getElementById("calculateButton")
    .addEventListener("click", function () {
      const numberInput = document.getElementById("numberInput");
      const numberValue = numberInput.value.trim();

      const ddInput = document.getElementById("DDInput");
      const ddValue = ddInput.value.trim();

      const tpInput = document.getElementById("TPInput");
      const tpValue = tpInput.value.trim();

      if (numberValue === "") {
        alert("กรุณาใส่จำนวนเงินเริ่มต้นก่อนที่จะคำนวณ");
        return;
      }

      // if (ddInput === "") {
      //   alert("กรุณาใส่จำนวนเงินเริ่มต้นก่อนที่จะคำนวณ");
      //   return;
      // }
      // if (tpInput === "") {
      //   alert("กรุณาใส่จำนวนเงินเริ่มต้นก่อนที่จะคำนวณ");
      //   return;
      // }

      DDIn = parseFloat(ddValue);

      TPIn = parseFloat(tpValue);

      StartB = parseFloat(numberValue);

      let percentDD = (DDIn / 100) * StartB;

      let percentTP = (TPIn / 100) * StartB;

      console.log(percentDD);
      console.log(percentTP);

      var hotData = hot.getData();
      var dailyResults = calculateDailyResults(hotData);

      console.log("Daily Drawdown/Profit:", dailyResults);

      if (
        hotData.length === 0 ||
        hotData[0].every((cell) => cell === null || cell === "")
      ) {
        alert("กรุณากรอกข้อมูลในตารางก่อนที่จะเริ่มคำนวณ");
        return;
      }
      calculateResults(hotData, StartB);
      extractDateTime(hotData);

      const {
        openDates,
        closeDates,

        dateOpen,
        dateClose,

        timeOpen,
        timeClose,
      } = extractDateTime(hotData);

      console.log("Open Dates/ time:", openDates);
      console.log("Close Dates/ time:", closeDates);

      console.log("openDates", dateOpen);
      console.log("CloseDates", dateClose);

      chartData = {
        labels: closeDates, // Add your labels here
        values: dailyResults, // Add your corresponding values here
      };

      // ---------------------------------------------------------------

      function calculateMonthlyProfitFromHotData(hotData) {
        const monthlyData = {};
        const monthNames = [
          "มกราคม",
          "กุมภาพันธ์",
          "มีนาคม",
          "เมษายน",
          "พฤษภาคม",
          "มิถุนายน",
          "กรกฎาคม",
          "สิงหาคม",
          "กันยายน",
          "ตุลาคม",
          "พฤศจิกายน",
          "ธันวาคม",
        ];

        for (const trade of hotData) {
          const profitLoss = parseFloat(trade[5]); // ใช้คอลัมน์ที่ 6 (Profit/Loss)
          const closeDate = new Date(trade[8]); // ใช้คอลัมน์ที่ 8 (Close date)
          const year = closeDate.getFullYear();
          const month = closeDate.getMonth() + 1;

          if (!monthlyData[year]) {
            monthlyData[year] = {};
          }
          if (!monthlyData[year][month]) {
            monthlyData[year][month] = 0;
          }

          monthlyData[year][month] += profitLoss;
        }

        const result = [];

        for (const year in monthlyData) {
          for (const month in monthlyData[year]) {
            const monthName = monthNames[parseInt(month, 10) - 1];
            result.push({
              year: parseInt(year, 10),
              month: monthName,
              profitLoss: monthlyData[year][month],
            });
          }
        }

        return result;
      }

      const monthlyProfitsFromHotData =
        calculateMonthlyProfitFromHotData(hotData);

      for (const entry of monthlyProfitsFromHotData) {
        console.log(
          `Year: ${entry.year}, Month: ${entry.month}, Profit/Loss: ${entry.profitLoss}`
        );
      }

      function displayMonthlyProfits(monthlyProfits) {
        const monthlyProfitsContainer = document.getElementById("monthlyProfits");
        const numberInput = document.getElementById("numberInput");

        if(monthlyProfitsContainer!==null){
          monthlyProfitsContainer.innerHTML = null;
        }
      
        let currentYear = null;
        let currentAmount = parseFloat(numberInput.value) || 0;

       
      
        for (let i = 0; i < monthlyProfits.length; i++) {
          const entry = monthlyProfits[i];
      
          if (currentYear !== entry.year) {
            const yearContainer = document.createElement("div");
            yearContainer.classList.add("yearContainer");
      
            const yearH3 = document.createElement("h3");
            yearH3.textContent = `ปี: ${entry.year}`;
      
            yearContainer.appendChild(yearH3);
            monthlyProfitsContainer.appendChild(yearContainer);
      
            currentYear = entry.year;
          }
      
          const monthContainer = document.createElement("div");
          monthContainer.classList.add("monthContainer");
      
          const monthParagraph = document.createElement("p");
          const startOfMonth = currentAmount;
      
          if (entry.profitLoss >= 0) {
            monthParagraph.textContent = `เดือน: ${entry.month}, กำไร: ${entry.profitLoss.toFixed(2)}`;
            currentAmount += entry.profitLoss;
          } else {
            monthParagraph.textContent = `เดือน: ${entry.month}, ขาดทุน: ${entry.profitLoss.toFixed(2)}`;
            currentAmount += entry.profitLoss;
      
            // ในเดือนที่ขาดทุน
            const lossPercentage = (entry.profitLoss / startOfMonth) * 100;
            const lossPercentageParagraph = document.createElement("p");
            // lossPercentageParagraph.textContent = `เปอร์เซ็นต์ขาดทุน: ${lossPercentage.toFixed(2)}%`;
            monthContainer.appendChild(lossPercentageParagraph);
          }
      
          monthlyProfitsContainer.lastChild.appendChild(monthContainer);
          monthContainer.appendChild(monthParagraph);
      
          if (i === 0) {
            // ในเดือนแรก
            const percentageChange = calculatePercentageChange(currentAmount, startOfMonth);
            const percentageParagraph = document.createElement("p");
            percentageParagraph.textContent = `คิดเป็นเปอร์เซ็นต์: ${percentageChange.toFixed(2)}%`;
            monthContainer.appendChild(percentageParagraph);
          } else {
            // ในเดือนถัดไป
            const previousProfitLoss = monthlyProfits[i - 1].profitLoss;
            const remainingPercentageChange = calculatePercentageChange(currentAmount, startOfMonth);
            const remainingPercentageParagraph = document.createElement("p");
            remainingPercentageParagraph.textContent = `คิดเป็นเปอร์เซ็นต์: ${remainingPercentageChange.toFixed(2)}%`;
            monthContainer.appendChild(remainingPercentageParagraph);
          }
        }
      }
      
      function calculatePercentageChange(currentValue, previousValue) {
        if (previousValue === 0) {
          return currentValue === 0 ? 0 : (currentValue > 0 ? Infinity : -Infinity);
        }
      
        return ((currentValue - previousValue) / Math.abs(previousValue)) * 100;
      }
    
      
      
      // แปลงข้อมูลที่มีอยู่ให้เป็นรูปแบบที่ต้องการ
      const monthlyProfits = calculateMonthlyProfitFromHotData(hotData);
      
      // เรียกใช้ฟังก์ชันที่แสดงผล
      displayMonthlyProfits(monthlyProfits);
      
      
      // ----------------------------------------------------------------

      dateClose.unshift("เริ่มต้น");

      // กำหนดค่า display ของคลาส ChartNa

      function createChart() {
        // ทำลาย Chart ที่มี Canvas ID เดียวกับ 'myChart' ก่อนที่จะสร้าง Chart ใหม่

        if (apexChart) {
          apexChart.destroy();
          apexChart = undefined; // เซ็ตให้เป็น undefined เพื่อบอกว่าถูกทำลายแล้ว
        }

        // สร้างข้อมูลสำหรับ ApexCharts
        const chartData = {
          series: [
            {
              name: "กำไร/ขาดทุน",
              data: dailyResults,
              color: "#7ac4ad",
            },
          ],

          chart: {
            type: "area",
            height: 500,
            width: 900,
            background: "#",
            // แก้ไข backgroundColor เป็น background
          },
          dataLabels: {
            enabled: true,

            formatter: function (val, { seriesIndex, dataPointIndex, w }) {
              const currentValue = val.toFixed(2);

              // ตรวจสอบว่าข้อมูลที่จะใช้ .toFixed() เป็นตัวเลขหรือไม่
              const previousValue =
                dataPointIndex > 0 &&
                typeof dailyResults[dataPointIndex - 1] === "number"
                  ? dailyResults[dataPointIndex - 1]
                  : 0;

              const diff = val - previousValue;
              const formattedDiff =
                diff >= 0
                  ? `+${diff.toFixed(2)}`
                  : `-${Math.abs(diff).toFixed(2)}`;

              return `${currentValue}(${formattedDiff})`;
            },
          },
          stroke: {
            curve: "straight",
            width: 1.5,
          },
          title: {
            text: "กราฟแสดงการเปลี่ยนแปลงของกำไรและขาดทุน",
            align: "left",
            style: {
              fontSize: "24px", // ปรับขนาดตัวอักษร
              fontWeight: "bold", // ปรับหน้าตาตัวหนา
              fontFamily: "kanit, sans-serif", // เลือกแบบอักษร
            },
          },
          subtitle: {
            text: [
              "สีฟ้าคือเป้าหมายที่คาดหวัง | สีเขียวคือจุดเริ่มต้น | สีแดงคือ DD ที่คาดการณ์",
            ],
            align: "left",
            marginBottom: "10px",
            style: {
              fontSize: "16px", // ปรับขนาดตัวอักษร
            },
          },

          xaxis: {
            categories: dateClose,

            labels: {
              style: {
                fontSize: "14px", // ปรับขนาดตัวอักษร
                fontFamily: "kanit, sans-serif", // เลือกแบบอักษร
              },
            },
          },
          yaxis: {
            min: StartB - percentDD - 5,

            // max: StartB + (StartB * 0.5), //เราต้องใช้จุดที่กำไรมากที่สุดคูณ 0.5 ค่อยคำนวณแล้วมาหยอด
            labels: {
              style: {
                fontSize: "14px", // ปรับขนาดตัวอักษร
                fontFamily: "kanit, sans-serif", // เลือกแบบอักษร
              },
            },
          },
          legend: {
            horizontalAlign: "left",
          },
          annotations: {
            yaxis: [
              {
                y: StartB,
                borderColor: "#54c19e",
                label: {
                  borderColor: "#54c19e",
                  style: {
                    color: "#fff",
                    background: "#54c19e",
                    fontSize: "14px", // ปรับขนาดตัวอักษร
                    fontFamily: "kanit, sans-serif", // เลือกแบบอักษร
                  },
                  text: `เริ่มต้นที่ : ${StartB}$`,
                },
              },
              {
                y: StartB - percentDD,
                borderColor: "#d54343",
                label: {
                  borderColor: "#d54343",

                  style: {
                    color: "#fff",
                    background: "#d54343",
                    fontSize: "14px",
                    textAlign: "center",
                    // ปรับขนาดตัวอักษร
                    fontFamily: "kanit, sans-serif",
                    // เลือกแบบอักษร
                  },
                  text: `${StartB - percentDD}$ : (-${DDIn}%)`,
                },
              },
              {
                y: StartB + percentTP,
                borderColor: "#4399d5",
                label: {
                  borderColor: "#4399d5",
                  style: {
                    color: "#fff",
                    background: "#4399d5",
                    fontSize: "14px", // ปรับขนาดตัวอักษร
                    fontFamily: "kanit, sans-serif", // เลือกแบบอักษร
                  },
                  text: `${StartB + percentTP}$ : (+${TPIn}%)`,
                },
              },
            ],
          },
        };

        // สร้าง ApexCharts และกำหนด ID ของ div เป้าหมาย
        apexChart = new ApexCharts(
          document.getElementById("myChart"),
          chartData
        );

        const myChartNa = document.getElementById("myChart");

        if (myChartNa) {
          // ตรวจสอบว่า myBox ไม่ใช่ undefined หรือ null
          const currentDisplay = window
            .getComputedStyle(myChartNa)
            .getPropertyValue("display");

          if (currentDisplay === "none") {
            myChartNa.style.display = "block";
          }
          // } else {
          //   myChartNa.style.display = "none";
          // }
        }

        // รender กราฟ
        apexChart.render();
      }

      // เรียกใช้ createChart เพื่อสร้างกราฟ
      createChart();
    });

  function calculateDailyResults(data) {
    var dailyResults = [];
    dailyResults.unshift(StartB);

    for (var i = 0; i < data.length; i++) {
      // ถ้าค่าที่อยู่ในคอลัมน์ 5 เป็นตัวเลขที่ไม่ใช่ NaN
      if (!isNaN(data[i][5])) {
        var dailyResult = calculateDailyResult(i, data);
        dailyResults.push(parseFloat(dailyResult));
      }
    }
    return dailyResults;
  }

  function calculateDailyResult(index, data) {
    var currentCapital = StartB;
    var dailyResult = 0;

    for (var i = 0; i <= index; i++) {
      var profitLoss = parseFloat(data[i][5]); // คอลัมน์ Profit/Loss

      if (!isNaN(profitLoss)) {
        currentCapital += profitLoss;
      }
    }

    // คำนวณ Drawdown หรือกำไรในแต่ละวัน
    dailyResult = currentCapital;

    return dailyResult.toFixed(2); // คืนค่าเป็นเลขทศนิยม 2 ตำแหน่ง
  }

  function extractDateTime(data) {
    // สร้างอาร์เรย์สำหรับเก็บข้อมูล Date และ Time
    // รวม Date รวม Time
    var openDates = [];
    var closeDates = [];

    // วันที่อย่างเดียว
    var dateOpen = [];
    var dateClose = [];

    // เวลาอย่างเดียว
    var timeOpen = [];
    var timeClose = [];

    // วนลูปผ่านข้อมูลและแยก Date กับ Time
    data.forEach(function (row) {
      const openDateTime = row[7].split(" ");
      const closeDateTime = row[8].split(" ");

      const openDate = openDateTime[0];
      const openTime = openDateTime[1];

      const closeDate = closeDateTime[0];
      const closeTime = closeDateTime[1];

      // รวม Date รวม Time
      openDates.push(openDate + " : " + openTime);
      closeDates.push(closeDate + " : " + closeTime);

      // วันที่อย่างเดียว
      dateOpen.push(openDate);
      dateClose.push(closeDate);

      // เวลาอย่างเดียว
      timeOpen.push(openTime);
      timeClose.push(closeTime);
    });

    return {
      openDates,
      closeDates,

      dateOpen,
      dateClose,

      timeOpen,
      timeClose,
    };
  }

  function calculateResults(data, StartB) {
    // ตรวจสอบเงื่อนไขและคำนวณตามที่ต้องการ
    let peak = 0;
    let drawdowns = [];
    let grossPlColumn = [];

    let pCount = 0;
    let lCount = 0;
    let sumInt = 0;
    let countL = 0;
    let countS = 0;
    let aTrade = 0;
    let winRate = 0;
    let lossRate = 0;
    let winLong = 0;
    let winShort = 0;
    let pnlT = "";
    let pnl = 0;

    let pSumData01 = 0;
    let nSumData01 = 0;
    let profitFac = 0; //ยังไม่ได้เพิ่มลืม

    let consecutiveLossCount = 0;
    let maxConsecutiveLossCount = 0;

    let consecutiveWinCount = 0;
    let maxConsecutiveWinCount = 0;

    let maxPositiveProfitLoss = null;
    let maxNegativeProfitLoss = null;

    for (const row of data) {
      const grossPl = parseFloat(row[5]); // คอลัมน์ Profit/Loss
      const data01 = parseFloat(row[5]); // คอลัมน์ Profit/Loss เป็นตัวเลข
      const opendd = parseFloat(row[7]);

      if (
        grossPl > 0 &&
        (maxPositiveProfitLoss === null || grossPl > maxPositiveProfitLoss)
      ) {
        maxPositiveProfitLoss = grossPl;
      }

      if (
        grossPl < 0 &&
        (maxNegativeProfitLoss === null || grossPl < maxNegativeProfitLoss)
      ) {
        maxNegativeProfitLoss = grossPl;
      }

      if (maxPositiveProfitLoss === null) {
        maxPositiveProfitLoss = 0;
      }

      if (maxNegativeProfitLoss === null) {
        maxNegativeProfitLoss = 0;
      }

      // นับจำนวนครั้งที่แพ้ติดต่อกันและชนะติดต่อกัน

      // วนลูปผ่านข้อมูล

      const profitLoss = data01;

      // ตรวจสอบว่าเป็นการแพ้หรือชนะ
      if (profitLoss < 0) {
        consecutiveLossCount++;
        consecutiveWinCount = 0; // รีเซ็ตนับการชนะติดต่อกัน
        maxConsecutiveLossCount = Math.max(
          maxConsecutiveLossCount,
          consecutiveLossCount
        );
      } else if (profitLoss > 0) {
        consecutiveWinCount++;
        consecutiveLossCount = 0; // รีเซ็ตนับการแพ้ติดต่อกัน
        maxConsecutiveWinCount = Math.max(
          maxConsecutiveWinCount,
          consecutiveWinCount
        );
      } else {
        // ถ้า profitLoss เป็น 0 ให้รีเซ็ตทั้งคู่
        consecutiveLossCount = 0;
        consecutiveWinCount = 0;
      }

      if (!isNaN(grossPl)) {
        peak = Math.max(peak, grossPl);
        const drawdown = ((peak - grossPl) / peak) * 100;
        drawdowns.push(drawdown);
        grossPlColumn.push(grossPl);
      }

      const side = row[2]; // คอลัมน์ Direction

      if (side) {
        if (side.toUpperCase() === "BUY" && data01 >= 0) {
          pCount++; //นับไม้ Buy ที่ชนะ
        } else if (side.toUpperCase() === "BUY" && data01 < 0) {
          lCount++; //นับไม้ Buy ที่แพ้
        } else if (side.toUpperCase() === "SELL" && data01 >= 0) {
          countS++; //นับไม้ Sell ที่ชนะ
        } else if (side.toUpperCase() === "SELL" && data01 < 0) {
          countL++; //นับไม้ Sell ที่แพ้
        }
      }

      if (!isNaN(data01)) {
        if (data01 >= 0) {
          pSumData01 += data01;
        } else {
          nSumData01 += data01;
        }

        testDD = opendd;

        profitO = pCount + countS;
        LossO = lCount + countL;

        sumInt += data01;
        aTrade = pCount + lCount + countL + countS;

        winRate = (profitO / aTrade) * 100;
        lossRate = (LossO / aTrade) * 100;

        winLong = (pCount / profitO) * 100;
        winShort = (countS / profitO) * 100;

        lossLong = (lCount / LossO) * 100;
        lossShort = (countL / LossO) * 100;

        SumRe = sumInt + StartB;

        if (SumRe < StartB) {
          pnlT = "ขาดทุน";
        } else if (SumRe > StartB) {
          pnlT = "กำไร";
        } else {
          pnlT = "เท่าทุน";
        }
      }

      pnl = SumRe - StartB;
      perPnl = (pnl / StartB) * 100;
    }

    nSumData01 = Math.abs(nSumData01);
    profitFac = pSumData01 / nSumData01;

    averProfit = pSumData01 / profitO;
    averLoss = nSumData01 / LossO;

    const winrateLong = (pCount / (pCount + lCount)) * 100;
    const winrateShort = (countS / (countS + countL)) * 100;

    const lossratelong = (lCount / (pCount + lCount)) * 100;
    const lossrateShort = (countL / (countS + countL)) * 100;

    const maxDrawdown = findMaxDrawdown(StartB, grossPlColumn);

    function calculateExpectancy(winRate, averProfit, lossRate, averLoss) {
      return (winRate / 100) * averProfit - (lossRate / 100) * averLoss;
    }

    const expectancy = calculateExpectancy(
      winRate,
      averProfit,
      lossRate,
      averLoss
    );

    // Display the result

    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `<!-- ผลลัพธ์ -->
        <div id="result">

        <div class="Month-result">
        
        
        
        </div>


        <div class="result01"> 

          <div class="alltrade" >
            <h2>การเทรดทั้งหมด: ${aTrade} ออเดอร์  </h2>
            
          </div>

          <div class="winAloss">

          <p>Drawdown <span> ${maxDrawdown.toFixed(2)}% </span> </p>
          <p>Expectancy: <span> ${expectancy.toFixed(2)}% </span> </p>
          <p>Profit Factor: <span> ${profitFac.toFixed(2)}% </span> </p>
          
        </div>

          

        </div>

        <div class="winlossbox">

          <div class="boxWining">

          <div class="winningIMG">
            <img src="img/losspro.png" alt="" srcset="">
          </div>

          <h1>Wining trade </h1>

          <div class="spaceP">

              <h3 class="topcen"> ชนะ ${profitO} จากทั้งหมด ${aTrade} ออเดอร์ </h3> 
              <p> แบ่งเป็นไม้ Buy <span> ${winLong.toFixed(
                2
              )}% ( ${pCount} ไม้ ) </span></p>
              <p> แบ่งเป็นไม้ Sell <span> ${winShort.toFixed(
                2
              )}% ( ${countS} ไม้ ) </span></p>
              
          </div>

          <div class="afSpace">

          
          
          <p>กำไรรวม <span>+${pSumData01.toFixed(2)}$ </span> </p>
          <p>ไม้ที่กำไรมากที่สุด <span>+ ${maxPositiveProfitLoss.toFixed(
            2
          )}$ </span> </p>
          <p>Win rate <span> ${winRate.toFixed(2)}% </span> </p>
          <p>Average Profit <span> ${averProfit.toFixed(2)}$ </span> </p>
          <p>อัตราชนะไม้ Buy <span> ${winrateLong.toFixed(2)}% </span> </p>
          <p>อัตราชนะไม้ Sell <span> ${winrateShort.toFixed(2)}% </span> </p>
          <p> Win streak <span> ${maxConsecutiveWinCount.toFixed(
            0
          )} ไม้ </span> </p>

          </div>
          
          </div>

          <br>
          <br>


          <div class="boxLossing">

          <div class="winningIMG">
            <img src="img/Winpro.png" alt="" srcset="">
          </div>
          <h1>Losing trade </h1>

          <div class="spaceP">

              <h3 class="pcen"> แพ้ ${LossO} จากทั้งหมด ${aTrade} ออเดอร์ </h3> 
              <p> แบ่งเป็นไม้ Buy <span> ${lossLong.toFixed(
                2
              )}% ( ${lCount} ไม้ ) </span></p>
              <p> แบ่งเป็นไม้ Sell <span> ${lossShort.toFixed(
                2
              )}% ( ${countL} ไม้ ) </span></p>
             
          </div>

          <div class="afSpace">

          <p>ขาดทุนรวม <span> -${nSumData01.toFixed(2)}$</span></p>
          <p>ไม้ที่ขาดทุนเยอะที่สุด <span> ${maxNegativeProfitLoss.toFixed(
            2
          )}$</span></p>
          <p>Loss rate <span> ${lossRate.toFixed(2)}% </span> </p>
          <p>Average Loss <span> ${averLoss.toFixed(2)}$ </span> </p>
          <p>อัตราแพ้ไม้ Buy <span> ${lossratelong.toFixed(2)}% </span> </p>
          <p>อัตราแพ้ไม้ Sell <span> ${lossrateShort.toFixed(2)}% </span> </p>
          <p> Loss streak <span> ${maxConsecutiveLossCount.toFixed(
            0
          )}  ไม้ </span> </p>

          </div>

          </div>

        </div>


        


          <div class="sumTotal">
          
          <h3>ยอด Balance คงเหลือ (ไม่หักคอมมิชชั่น) : <span> ${SumRe.toFixed(
            2
          )}$</span></h3>
          <h3>พอร์ตของคุณ <span> ${pnlT} ${pnl.toFixed(
      2
    )}$ </span>  คิดเป็น <span> ${perPnl.toFixed(
      2
    )}% </span>ของเงินเริ่มต้น</h3>

          </div>`;

    let textFeed = document.getElementById("textFeedp");

    if (SumRe > StartB) {
      textFeed.querySelector("h3").textContent = "";
      textFeed.querySelector("h3").textContent =
        "ดีใจด้วยนะครับพอร์ตของคุณได้กำไรในการ Test แต่ก็อย่าลืมเรื่อง Drawdown กับ Risk:Reward ด้วยล่ะ";
    } else if (SumRe == StartB) {
      textFeed.querySelector("h3").textContent = "";
      textFeed.querySelector("h3").textContent =
        "ถึงแม้ว่าพอร์ตของคุณจะไม่กำไรแต่อย่างน้อยคุณก็ไม่ขาดทุน ลองใหม่อีกครั้งดูนะครับลุยยย!";
    } else {
      textFeed.querySelector("h3").textContent = "";
      textFeed.querySelector("h3").textContent =
        "ไม่เป็นไรนะครับ การที่คุณเลือกที่จะ Test ก่อนนั่นก็เยี่ยมมากๆแล้ว ลองกันใหม่นะครับ ลุยย!";
    }
  }

  function findMaxDrawdown(initialCapital, numbers) {
    let currentCapital = initialCapital;
    let peak = initialCapital;
    let maxDrawdown = 0;

    for (const number of numbers) {
      currentCapital += number;

      if (currentCapital > peak) {
        peak = currentCapital;
      }

      const drawdown = ((peak - currentCapital) / peak) * 100;
      maxDrawdown = Math.max(maxDrawdown, drawdown);
    }

    return maxDrawdown;
  }
  var clearButton = document.getElementById("clearButton");
  clearButton.addEventListener("click", function () {
    // เคลียร์ข้อมูลใน Handsontable
    hot.loadData([
      [
        "jf3pomq1a",
        0.001,
        "SELL",
        1.44963,
        1.4375,
        12.13,
        121.3,
        "2010-01-14 22:52:30",
        "2010-01-15 13:52:30",
      ],
      [
        "jf5ss6yre",
        0.001,
        "SELL",
        1.4152081,
        1.40795,
        7.26,
        72.6,
        "2010-01-24 23:52:30",
        "2010-01-26 11:52:30",
      ],
      [
        "jf17zgc71",
        0.001,
        "SELL",
        1.4014276,
        1.39631,
        5.12,
        51.2,
        "2010-01-28 05:52:30",
        "2010-01-29 07:52:30",
      ],
      [
        "jfxz6us8u",
        0.001,
        "SELL",
        1.3914044,
        1.37405,
        17.35,
        173.5,
        "2010-02-01 13:52:30",
        "2010-02-04 23:52:30",
      ],
      // เพิ่มข้อมูลอื่น ๆ ตามต้องการ
    ]);

    // let myChart = null;

    document.getElementById("numberInput").value = "";
    document.getElementById("DDInput").value = "";
    document.getElementById("TPInput").value = "";
    document.getElementById("result").innerHTML = "";
    document.getElementById("monthlyProfits").innerHTML = "";

    if (apexChart) {
      apexChart.destroy();
      apexChart = undefined; // เซ็ตให้เป็น undefined เพื่อบอกว่าถูกทำลายแล้ว
    }
    const myChartNa = document.getElementById("myChart");

    if (myChartNa) {
      // ตรวจสอบว่า myBox ไม่ใช่ undefined หรือ null
      const currentDisplay = window
        .getComputedStyle(myChartNa)
        .getPropertyValue("display");

      if (currentDisplay === "block") {
        myChartNa.style.display = "none";
      }
    }

    let textFeed = document.getElementById("textFeedp");

    textFeed.querySelector("h3").textContent = "";
    textFeed.querySelector("h3").textContent = "ลองดูอีกครั้งนะค้าบพี่ชายย ลุยย";
  });
});


