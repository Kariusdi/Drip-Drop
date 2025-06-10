import firebaseApp from "@/firebaseConfig";
import { getDatabase } from "firebase/database";

const realtime_db = getDatabase(firebaseApp);

export default realtime_db;
