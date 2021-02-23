const sum = (a, b) => {
    return (a+b);
};

const getContacts = (count) => {
    let contacts = [];
    for(let i=0; i<count;i++){
        let contact =
        {
            firstName: `First Name ${i}`,
            lastName: `Last Name ${i}` ,
            email: `abc@xyz.com.${i}`
        };
        contacts.push(contact);
    }
    return contacts;
};

export {sum, getContacts};