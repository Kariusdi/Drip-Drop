import React from "react";

const manaul = [
  {
    title: "Step 1",
    content: "เทน้ำมันลงช่องด้านล่าง แล้วกดปุ่มโอเค",
  },
  {
    title: "Step 2",
    content: "รอเครื่องตรวจสอบ แล้วดูผลว่าผ่านหรือไม่",
  },
  {
    title: "Step 3",
    content: "ถ้าผ่าน จะแสดงราคาต่อและราคารวม กดปุ่มขายเพื่อยืนยัน",
  },
];

/*
1. เทน้ำมันลงช่องด้านล่าง แล้วกดปุ่มโอเค
2. รอเครื่องตรวจสอบ แล้วดูผลว่าผ่านหรือไม่
3. ถ้าผ่าน จะแสดงราคาต่อและราคารวม กดปุ่มขายเพื่อยืนยัน
4. ถ้าไม่ผ่าน รับน้ำมันคืนตามที่กำหนด
*/

const page = () => {
  return (
    <section>
      <h1 className="text-h1 font-bold">ขั้นตอนการขายน้ำมัน</h1>
      {manaul.map((item, index) => (
        <div
          key={index}
          className="rounded-full space-y-4 bg-white h-80 w-80 flex flex-col justify-center items-center p-10"
        >
          {/* <h2 className="text-h2">{item.title}</h2> */}
          <p className="font-medium text-h3">{item.content}</p>
        </div>
      ))}
    </section>
  );
};

export default page;
