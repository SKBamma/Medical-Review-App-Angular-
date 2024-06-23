export const initial_medicine_state = {
    _id: '',
    name: '',
    first_letter: '',
    generic_name: '',
    medication_class: '',
    availability: '',
    image: {
        filename: '',
        originalname: '',
    },
    added_by: {
        user_id: '',
        fullname: '',
        email: '',
    },
    reviews: [
        {
            review: '',
            rating: 0,
            by: {
                user_id: '',
                fullname: '',
            },
            date: 0,
        },
    ]
};

export type IMedication = {
    _id: string,
    name: string,
    first_letter?: string,
    generic_name: string,
    medication_class: string,
    availability: string,
    image: Image,
    added_by: IOwner,
    reviews?: IReview[];
};

export type Image = {
    _id: string,
    filename?: string,
    originalname?: string;
};
export type IOwner = {
    user_id: string,
    fullname: string,
    email: string;
};
export type IReview = {
    _id: string,
    review: string,
    rating: number,
    by: {
        user_id: string,
        fullname: string;
    },
    date?: number;
};
export type IMedication_List = {
    _id: string,
    name: string;
};

export type IMed = {
    name: string,
    generic_name: string,
    medication_class: string,
    availability: string;
};
export type multipart = "medication_image";

export type IMedication_Response = {
    success: boolean,
    data: IMedication;
};
export type IPost_Review = {
    _id?: string;
    review: string,
    rating: number;
};

export const initial_Review = {
    review: '',
    rating: 0,
    by: {
        user_id: '',
        fullname: '',
    },
    date: 0,
};
export type IReview_Response = {
    success: boolean,
    data: string;
};
export type RIeviews_Responses = {
    success: boolean,
    data: IReview[];
};