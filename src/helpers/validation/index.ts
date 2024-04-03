import * as Yup from 'yup';

interface IProps {
    required?: boolean; 
}
// Define the email validation schema
const emailSchema = (props: IProps) => {
    const base = Yup.string()
        .email('Invalid email format'); 
    if (props.required === true) {
        base.required('Email is required')
    }
        base.matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format');
    return base;
}

// Define the mobile phone validation schema for Iraq
const iraqMobilePhoneSchema = (props: IProps) => {
    const base = Yup.string()
    if (props.required) {
        base.required('Mobile phone number is required');
    }
    base.matches(/^(\\+?964|0)?7[0-9]{8}$/, 'Invalid Iraqi mobile phone number');
    return base;
}


export { emailSchema, iraqMobilePhoneSchema };
