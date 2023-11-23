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

    const [usernameExists, setUsernameExists] = useState(false);

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
            // Check if the user with the given username already exists
            const checkResponse = await fetch(`https://bilazon.pythonanywhere.com/read/notandi`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "where": `notendanafn="${accountInfo.notendanafn}"`
                }),
            });
    
            if (!checkResponse.ok) {
                throw new Error(`HTTP error! Status: ${checkResponse.status}`);
            }
    
            const existingUsers = await checkResponse.json();
            if (existingUsers.info.length > 0) {
                // User with the given username already exists
                console.error('User with this username already exists');
                setUsernameExists(true)
                return;
            }
    
            // If the user doesn't exist, proceed with creating the account
            const response = await fetch('https://bilazon.pythonanywhere.com/add/notandi', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(accountInfo),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            console.log('User added successfully!');
            setUsernameExists(false)
    
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    return (
        <div className='login-container'>
            {usernameExists && <h3>Username er núþegar til, reyndu aftur</h3>}

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
                    <input type="password" name="lykilord" value={accountInfo.lykilord} required onChange={handleInputChange} />
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
