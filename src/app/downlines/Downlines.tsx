"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { User } from "lucide-react";
// import style from "../styles/downlinestyles.css";
import {
  Countlinerdata,
  DownlineCount,
  DownlineCountadress,
  getUSERLEVEL,
  TEstDownlineCount,
  TotalIncome2,
} from "../../../wagmi/method";
import { useAccount, useBalance, useDisconnect } from "wagmi";

type DownlineDataInterface = {
  address: string;
  downlines: string; // Direct count as string
  vrData?: { currentUserLevel: number; totalIncome: number };
  user?: { name: string; countId: number };
};

export default function Downlines() {
  const [query, setQuery] = useState("");
  const [downlinesData, setDownlinesData] = useState<DownlineDataInterface[]>(
    []
  );
  const { address, isConnected } = useAccount();

  const router = useRouter();
  const colors = ["#007bff", "rgb(255 164 7)", "#28a745", "#e83e8c"];
  const getRandomColor = () =>
    colors[Math.floor(Math.random() * colors.length)];
  const [adress, setAddress] = useState("");

  const searchParams = useSearchParams();
  const urlAddress = searchParams.get("Address");

  useEffect(() => {
    if (urlAddress === "0xCe737A1352A5Fe4626929bb5747C55a02DC307b9") {
      console.log(" owner ----------------- firstif");
      if (address === "0xCe737A1352A5Fe4626929bb5747C55a02DC307b9") {
        console.log("owner ---------------- snd if");
        setAddress(urlAddress || "");
        return;
      } else {
        console.log("owner else condition");
        setAddress("");
        return;
      }
    } else {
      setAddress(urlAddress || "");
    }
  }, [urlAddress]);

  useEffect(() => {
    if (adress) {
      fetchDownlines();
    }
  }, [adress]);

  const fetchDownlines = async () => {
    try {
      const resp = await DownlineCount(adress);
      const respnum = Number(resp);

      setDownlinesData([]); // Reset state before fetching new data

      for (let i = 0; i < respnum; i++) {
        try {
          const resp = await DownlineCountadress(adress, i.toString());
          try {
            // const respdata = await Countlinerdata(resp.toString());
            // const nameID = (await TotalIncome2(resp.toString())) as [
            //   string, string, string, string, bigint, bigint, bigint
            // ];
            // const level = await getUSERLEVEL(resp.toString());
            // const downlinez = await TEstDownlineCount(resp.toString());
            const [respdata, nameID, level, downlinez] = await Promise.all([
              Countlinerdata(resp.toString()),
              TotalIncome2(resp.toString()),
              getUSERLEVEL(resp.toString()),
              TEstDownlineCount(resp.toString()),
            ]);
            const newDownline: DownlineDataInterface = {
              address: resp.toString(),
              downlines: downlinez.toString(),
              vrData: {
                currentUserLevel: Number(level),
                totalIncome: Number(respdata[2]) / 1e18,
              },
              user: {
                name: nameID[0].toString(),
                countId: Number(nameID[5]),
              },
            };

            // **Update State Immediately to Reflect New Entry in UI**
            setDownlinesData((prev) => [...prev, newDownline]);
          } catch (error) {
            console.log(error);
          }
        } catch (error) {
          console.error("Error fetching downline address:", error);
        }
      }
    } catch (error) {
      console.error("Error while fetching downliner data:", error);
    }
  };

  // **Filtering logic for search**
  const filteredDownlines = downlinesData.filter(
    (downline) =>
      downline.user?.countId.toString().includes(query) || // Match by ID
      downline.user?.name.toLowerCase().includes(query.toLowerCase()) // Match by Name
  );

  return (
    <div className="downlines">
      <div className="bg" />
      <div className="topBar">
        <h2 style={{ paddingTop: "20px" }}> Downlines Overview</h2>
      </div>

      <div className="researchSection">
        <div
          onClick={() => {
            router.push(
              `${window.location.origin}/dashboard?Address=${adress}`
            );
          }}
        >
          <ArrowLeft />
        </div>
        <div
          style={{
            marginTop: "0px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <input
            style={{ width: "100%" }}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="search"
            placeholder="Search by ID or Name..."
          />
        </div>
      </div>

      <div className="customGridContainer">
        {filteredDownlines.length > 0 ? (
          filteredDownlines.map((downline) => (
            <CustomGridContainer
              key={downline.address}
              downline={downline}
              getRandomColor={getRandomColor}
            />
          ))
        ) : (
          <p style={{ textAlign: "center", color: "#aaa" }}>
            No matching downlines found.
          </p>
        )}
      </div>
    </div>
  );
}

// **Reusable Card Component for Downline Data**
function CustomGridContainer({
  downline,
  getRandomColor,
}: {
  downline: DownlineDataInterface;
  getRandomColor: () => string;
}) {
  return (
    <div
      className="card"
      style={{
        width: "100%",
        maxWidth: "400px",
        height: "auto",
        padding: "1rem",
      }}
    >
      <div
        style={{ backgroundColor: getRandomColor(), padding: "1rem" }}
        className="cardHeader"
      >
        <div className="cardLeft">
          <User size={30} strokeWidth={1} />
          <h3>{downline.user?.name}</h3>
        </div>
        <div className="cardRight">{downline.user?.countId}</div>
      </div>
      <div className="cardBody" style={{ overflow: "hidden" }}>
        <p>
          <strong>Address:</strong> {downline.address}
        </p>
        <p>
          <strong>Level:</strong> {downline.vrData?.currentUserLevel}
        </p>
        <p>
          <strong>Total Income:</strong>{" "}
          {downline.vrData?.totalIncome.toFixed(2) || "0"} Sonic
        </p>
        <p>
          <strong>Directs:</strong> {downline.downlines}
        </p>
      </div>
    </div>
  );
}
