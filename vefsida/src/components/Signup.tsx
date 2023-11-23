import React, { useState } from 'react';

const Signup: React.FC = () => {
    const [accountInfo, setAccountInfo] = useState({
        "notendanafn" : "",
        "lykilord" : "",
        "netfang" : "",
        "nafn" : "",
        "simanumer" : "",
        "dob" : "",
        "tegundnotanda" : 0
    });

    const [error, setError] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setAccountInfo((prevInfo) => ({
          ...prevInfo,
          [name]: name === 'tegundnotanda' ? parseInt(value, 10) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
            const response = await fetch('https://bilazon.pythonanywhere.com/signup/notandi', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "checkInfo" : ["notendanafn", "netfang"],
                    "info" : accountInfo
                }),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();

            if (data["signed up"] === 1) {
                console.log('User added successfully!');
                setError("Account Created");
            } else {
                console.error('Failed to create user. Please try again.');
                setError("Notandanafn eða netfang núþegar notað");
            }
    
        } catch (error) {
            console.error('Error adding user:', error);
            setError("Vandamál með nýskráningu");
        }
    };

    return (
            <h3>{error}</h3>

            <h1>Create Account</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Notenda Nafn:
                    <input type="text" name="notendanafn" value={accountInfo.notendanafn} required onChange={handleInputChange} />
                </label>
                <br />
                <label>
                    Nafn:
                    <input type="text" name="nafn" value={accountInfo.nafn} required onChange={handleInputChange} />
                </label>
                <br />
                <label>
                    Lykilorð:
                    <input type="password" name="lykilord" value={accountInfo.lykilord} minLength={8} maxLength={50} autoComplete='off' required onChange={handleInputChange} />
                </label>
                <br />
                <label>
                    Netfang:
                    <input type="mail" name="netfang" value={accountInfo.netfang} required onChange={handleInputChange} />
                </label>
                <br />
                <label>
                    Símanúmer:
                    <input type="tel" name="simanumer" value={accountInfo.simanumer} required onChange={handleInputChange} />
                </label>
                <br />
                <label>
                    Fæðingar Dagur:
                    <input type="date" name="dob" value={accountInfo.dob} required onChange={handleInputChange} />
                </label>
                <br />

                <label >Tegund Notanda:</label>
                <select id="tegundNotanda" name="tegundnotanda" value={accountInfo.tegundnotanda} onChange={handleInputChange}>
                <option value="0">Nemandi</option>
                <option value="1">Kennari</option>
                </select>
                <br />
                
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default Signup;