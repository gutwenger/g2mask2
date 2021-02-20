export const ADMIN_FORM_FIELDS = {
    createItem: [
        {
            title: "MASK NAME",
            name: "name",
            type: "text",
            required: true,
        },
        {
            title: "TYPE",
            name: "mask_type",
            type: "select",
            choiceSource: "type",
        },
        {
            title: "BRAND",
            name: "brand",
            type: "select",
            choiceSource: "brand"
        },
        {
            title: "BRAND (Others)",
            name: "other_brand",
            type: "text",
            required: false,
        },
        {
            title: "DESCRIPTION",
            name: "description",
            type: "text",
            required: true,
        },
        {
            title: "IMAGE URL",
            name: "img",
            type: "url",
            required: true,
        },
        {
            title: "PROTECTIONS",
            name: "protection",
            type: "checkbox",
            choiceSource: "protection"
        },
        {
            title: "COLOR",
            name: "color",
            type: "text",
            required: true,
        },
        {
            title: "ORIGINAL",
            name: "origin",
            type: "select",
            choiceSource: "origin"
        },
        {
            title: "PRICE",
            name: "price",
            type: "text-text",
            fields: [
                {
                    name: "current",
                    required: true,
                },
                {
                    name: "original",
                    required: true,
                }
            ]
        },
        {
            title: "ITEM ON SALE?",
            name: "is_sale",
            type: "radio",
            choices: [
                {
                    choice: "YES",
                    value: true
                },
                {
                    choice: "NO",
                    value: true
                }
            ]
        },
        {
            title: "ACTIVE ITEM?",
            name: "is_active",
            type: "radio",
            choices: [
                {
                    choice: "YES",
                    value: true
                },
                {
                    choice: "NO",
                    value: true
                }
            ]
        },
        {
            title: "VARIATIONS",
            name: "variations",
            type: "checkbox-text",
            choices: [
                {
                    name: "extraSmall",
                    value: "XS",
                    choice: "XS, Extra Small",
                },
                {
                    name: "small",
                    value: "S",
                    choice: "S, Small",
                },
                {
                    name: "medium",
                    value: "M",
                    choice: "M, Medium",
                },
                {
                    name: "large",
                    value: "L",
                    choice: "L, Large",
                },
                {
                    name: "extraLarge",
                    value: "XL",
                    choice: "XL, Extra Large",
                },
                {
                    name: "kid",
                    value: "KID",
                    choice: "Kid",
                },
                {
                    name: "junior",
                    value: "JUN",
                    choice: "Junior",
                },
                {
                    name: "adult",
                    value: "ADU",
                    choice: "Adult",
                },
            ]
        },
    ]
}