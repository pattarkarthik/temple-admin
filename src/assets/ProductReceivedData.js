export const data = [
    {
      yelamPorul: "Ganesha Idol" ,
      pulliId: "PAADD04",
      name: "John",
      native: "NY",
      WhatsupNumber1: 9889012345,
      WhatsupNumber2: 7834523123,
      ProductReceivingNumber: 4565,
      addressLine1: "123 Main St",
      addressLine2: "Apt 4B",
      remark: "This Idol has a stand",
    },
    
  ];

  export const columns = [
    { label: "Edit", dataKey: "edit" }, // New column for the Edit button
    { label: "Yelam Porul", dataKey: "yelamPorul" },
    { label: "Pulli Id", dataKey: "pulliId" },
    { label: "Name", dataKey: "name" },
    {label:"Native",datakey:"native"},
    { label: "Whatsup Number 1", dataKey: "WhatsupNumber1" },
    { label: "Whatsup Number 2", dataKey: "WhatsupNumber2" },
    { label: "Product Receiving Number", dataKey: "ProductReceivingNumber" },
    { label: "Remark", dataKey: "remark" },
  ];

  export const formProductData = [
    {label:"ஏலம் பொருள்",name:"Yelam Porul",required: true },
    { label: "புள்ளி id",name:"Pulli Id", required:true },
    {label:"பெயர்",name:"name",required:true},
    {
      label: "பூர்வீகம்",
      name: "native",
      required: true,
      type: "dropdown",
      options: [
        { label: "வலையபட்டி", value: "Valayapatti" },
        { label: "கல்லல்", value: "Kallal" },
        { label: "கண்டனூர்", value: "Kandanur" },
        { label: "காரைக்குடி", value: "Karaikudi" },
        { label: "மேலைசிவபுரி", value: "Melaisivapuri" },
      ],
    },
    { label: "வாட்ஸ்அப் எண் 1",name:"WhatsApp No 1" ,required:true,type: "tel" },
    { label: "வாட்ஸ்அப் எண் 2",name:"WhatsApp No 2" ,required:true,type: "tel" },
    { label: "தயாரிப்பு பெறுதல் எண்",name:"Product Receiving Number" ,required:true },
    { label: "குறிப்பு",name:"Remark" ,required:true },
  ];
  