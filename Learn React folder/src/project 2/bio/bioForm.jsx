import { useState } from "preact/hooks";

function BioForm(props) {
    const [first, setFirst] = useState(props.data?.fName || "");
    const [last, setLast] = useState(props.data?.lName || "");
    const [email, setEmail] = useState(props.data?.email || "");
    const [phone, setPhone] = useState(props.data?.pNum || "");
    const key = "bio";

    function getData() {
        console.log(first);
        console.log(last);
        console.log(email);
        console.log(phone);
    }

    return(
        <div className="box">
            
            <label htmlFor="f-name">First Name : </label>
            <input type="text" name="f-name" id="f-name" placeholder="First Name" value={first} onInput={(e) => {
                setFirst(e.target.value);
            }}/>

            <label htmlFor="l-name">Last Name : </label>
            <input type="text" name="l-name" id="l-name" placeholder="Last Name" value={last} onInput={(e) => {
                setLast(e.target.value);
            }}/>

            <label htmlFor="email">Email : </label>
            <input type="email" name="email" id="email" placeholder="Email" value={email} onInput={(e) => {
                setEmail(e.target.value);
            }}/>

            <label htmlFor="p-num">Phone Number : </label>
            <input type="text" name="p-num" id="p-num" placeholder="Phone Number" value={phone} onInput={(e) => {
                setPhone(e.target.value)
            }}/>

            <span className="btn">
                <button type="button" onClick={() => {
                    if (first.trim() != "" || last.trim() != "" || email.trim() != "" || phone.trim() != "" ) {
                        const data = {
                            fName: first,
                            lName: last,
                            email: email,
                            pNum: phone,
                            show: false
                        }
                        props.sendData(key, data)
                        props.setData(props.setShow(key));
                    }
                }}>Submit</button>
            </span>
        </div>
    )
}

export default BioForm;