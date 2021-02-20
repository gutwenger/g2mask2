export const CHECKOUT_FORM_FIELDS = {
    shipping_method: [
        {
            label: "Shipping Method",
            name: "shipping_method",
            type: "radio",
            title: "Please choose a shipping method:",
            choices: [
                {
                    value: "standard",
                    display: "Standard (+$20)"
                },
                {
                    value: "priority",
                    display: "Priority (+$100)"
                }
            ]
        }
    ],
    shipping: [
        {
            label: "First Name",
            name: "firstname",
            type: "text",
        },
        {
            label: "Last Name",
            name: "lastname",
            type: "text",
        },
        {
            label: "Flat / Room",
            name: "flat",
            type: "text",
        },
        {
            label: "Building / Apartment",
            name: "apartment",
            type: "text",
        },
        {
            label: "Street",
            name: "street",
            type: "text",
        },
        {
            label: "Area",
            name: "area",
            type: "text",
        },
        {
            label: "District",
            name: "district",
            type: "radio",
            title: "District",
            choices: [
                {
                    value: "Hong Kong Island",
                    display: "Hong Kong Island"
                },
                {
                    value: "Kowloon",
                    display: "Kowloon"
                },
                {
                    value: "New Territories",
                    display: "New Territories"
                },
            ]
        }
    ],
    billing: [
        {
            label: "First Name",
            name: "firstname",
            type: "text",
        },
        {
            label: "Last Name",
            name: "lastname",
            type: "text",
        },
        {
            label: "Flat / Room",
            name: "flat",
            type: "text",
        },
        {
            label: "Building / Apartment",
            name: "apartment",
            type: "text",
        },
        {
            label: "Street",
            name: "street",
            type: "text",
        },
        {
            label: "Area",
            name: "area",
            type: "text",
        },
        {
            label: "District",
            name: "district",
            type: "radio",
            title: "District",
            choices: [
                {
                    value: "Hong Kong Island",
                    display: "Hong Kong Island"
                },
                {
                    value: "Kowloon",
                    display: "Kowloon"
                },
                {
                    value: "New Territories",
                    display: "New Territories"
                },
            ]
        }
    ],
    payment: [
        {
            label: "Card Type",
            name: "method",
            type: "radio",
            title: "Card Type",
            choices: [
                {
                    value: "visa",
                    display: "VISA"
                },
                {
                    value: "master",
                    display: "Mastercard"
                },
            ]
        },
        {
            label: "Card Number",
            name: "card_number",
            type: "number",
        },
        {
            label: "Card Holder's First Name",
            name: "card_holder_firstname",
            type: "text",
        },
        {
            label: "Card Holder's Last Name",
            name: "card_holder_lastname",
            type: "text",
        },
    ]
}