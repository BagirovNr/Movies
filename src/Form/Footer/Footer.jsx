import { useEffect, useState } from "react"
import footer from "../Footer/footer.module.scss"
export function Footer() {
    const [date, setDate] = useState(new Date());
    useEffect(() => {
        const id = setInterval(() => {
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); //indexle sayilir deye +1 edirik    
            const day = currentDate.getDate().toString().padStart(2, '0');
            const hours = currentDate.getHours().toString().padStart(2, '0');
            const minutes = currentDate.getMinutes().toString().padStart(2, '0');
            const seconds = currentDate.getSeconds().toString().padStart(2, '0');

            const formattedDate = `${day}/${month}/${year}  ${hours}:${minutes}:${seconds}`;
            setDate(formattedDate);
        }, 1000);

        return () => {
            clearInterval(id);
        }
    }, []);

    return (
        <>
            <h2 className={footer.date}>{date.toString()}</h2>
        </>
    )

}