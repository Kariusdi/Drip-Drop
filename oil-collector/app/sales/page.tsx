import React from "react";
import AppTable from "../_components/AppTable";
import Image from "next/image";
import Logo from "@/assets/drop.png";
const rows = [
  { id: 1, saleDate: "2023-10-01", quantities: 100, proceeds: 500 },
  { id: 2, saleDate: "2023-10-02", quantities: 150, proceeds: 750 },
  { id: 3, saleDate: "2023-10-03", quantities: 200, proceeds: 1000 },
  { id: 4, saleDate: "2023-10-04", quantities: 250, proceeds: 1250 },
  { id: 5, saleDate: "2023-10-05", quantities: 300, proceeds: 1500 },
  { id: 6, saleDate: "2023-10-06", quantities: 350, proceeds: 1750 },
  { id: 7, saleDate: "2023-10-07", quantities: 400, proceeds: 2000 },
  { id: 8, saleDate: "2023-10-08", quantities: 450, proceeds: 2250 },
  { id: 9, saleDate: "2023-10-09", quantities: 500, proceeds: 2500 },
  { id: 10, saleDate: "2023-10-10", quantities: 550, proceeds: 2750 },
  { id: 11, saleDate: "2023-10-11", quantities: 600, proceeds: 3000 },
];

const SalesPage = () => {
  return (
    <div className="relative w-full h-full p-5 flex flex-col justify-center items-center space-y-10">
      <div className="absolute top-2 flex justify-between items-center w-full px-2">
        <div className="rounded-full p-5 bg-white shadow-[0px_0px_30px_rgba(0,0,0,0.1)] shadow-primary">
          <Image
            src={Logo}
            alt="logo"
            width={50}
            height={50}
            quality={100}
            placeholder="empty"
            priority
          />
        </div>
        <p className="text-xl">
          <span>เบอร์โทร: </span>095-573-9706
        </p>
      </div>
      <h3 className="text-h3 font-medium text-secondary">
        ตารางแสดงประวัติยอดขาย
      </h3>
      <AppTable dataSource={rows} />
    </div>
  );
};

export default SalesPage;
