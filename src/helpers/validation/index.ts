import * as Yup from 'yup';

interface IProps {
    required?: boolean; 
}
// Define the email validation schema
const emailSchema = (props: IProps) => {
 
    if (props.required === true) {
        return Yup.string()
            .required('Email is required')
            .email('Invalid email format')
            .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format');
    }
    return Yup.string()
        .email('Invalid email format').matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format');
}

// Define image asset schema
const assetSchema = () => {
    return Yup.object().shape({
        path: Yup.string(),
        imageType: Yup.number().required("Image type is required"),
        aspectRatio: Yup.number().required("Aspect Ratio type is required"),
    });
}

// Define the mobile phone validation schema for Iraq
const iraqMobilePhoneSchema = (props: IProps) => {
    if (props.required) {
        return Yup.string()
            .required('Mobile phone number is required')
            .matches(/^(\\+?964|0)?7[0-9]{8}$/, 'Invalid Iraqi mobile phone number');
    }
    return Yup.string().matches(/^(\\+?964|0)?7[0-9]{8}$/, 'Invalid Iraqi mobile phone number');

}


export { emailSchema, iraqMobilePhoneSchema, assetSchema };
