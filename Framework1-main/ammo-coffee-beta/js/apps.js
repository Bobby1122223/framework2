document.addEventListener("alpine:init", () => {
  Alpine.data("menu", () => ({
    items: [
      {
        id: 1,
        name: 'Americano',
        description: 'lorem sahbdhbfkhbakdb jdahsbahbdha adbkhadbjkjak',
        img: "1.jpg.jpg",
        price: 20000,
      },
      {
        id: 2,
        name: "Caffe Latte",
        description: "lorem sahbdhbfkhbakdb jdahsbahbdha adbkhadbjkjak",
        img: "2.jpg.jpg",
        price: 22000,
      },
      {
        id: 3,
        name: "Cappucino",
        description: "lorem sahbdhbfkhbakdb jdahsbahbdha adbkhadbjkjak",
        img: "3.jpg.jpg",
        price: 22000,
      },
      {
        id: 4,
        name: "Espresso",
        description: "lorem sahbdhbfkhbakdb jdahsbahbdha adbkhadbjkjak",
        img: "4.jpg.jpg",
        price: 15000,
      },
      {
        id: 5,
        name: "Moccacino",
        description: "lorem sahbdhbfkhbakdb jdahsbahbdha adbkhadbjkjak",
        img: "5.jpg.jpg",
        price: 18000,
      },
      {
        id: 6,
        name: "Vietnam Drip",
        description: "lorem sahbdhbfkhbakdb jdahsbahbdha adbkhadbjkjak",
        img: "6.jpg.jpg",
        price: 18000,
      },
      {
        id: 7,
        name: "Vanila Latte",
        description: "lorem sahbdhbfkhbakdb jdahsbahbdha adbkhadbjkjak",
        img: "7.jpg.jpg",
        price: 22000,
      },
      {
        id: 8,
        name: "Hot Chocolate",
        description: "lorem sahbdhbfkhbakdb jdahsbahbdha adbkhadbjkjak",
        img: "8.jpg.jpg",
        price: 22000,
      },
      {
        id: 9,
        name: "Hot Matcha",
        description: "lorem sahbdhbfkhbakdb jdahsbahbdha adbkhadbjkjak",
        img: "9.jpg.jpg",
        price: 22000,
      },
      {
        id: 10,
        name: "Ice CHocolate",
        description: "lorem sahbdhbfkhbakdb jdahsbahbdha adbkhadbjkjak",
        img: "10.jpg.jpg",
        price: 23000,
      },
      {
        id: 11,
        name: "Ice Matcha",
        description: "lorem sahbdhbfkhbakdb jdahsbahbdha adbkhadbjkjak",
        img: "11.jpg.jpg",
        price: 23000,
      },
      {
        id: 12,
        name: "Koka Milo",
        description: "lorem sahbdhbfkhbakdb jdahsbahbdha adbkhadbjkjak",
        img: "12.jpg.jpeg",
        price: 23000,
      },
    ],
  }));

  Alpine.store(`cart`, {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      //cek barang
      const cartItem = this.items.find((item) => item.id === newItem.id);

      //cek cart kosong
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        //jika barang sudah ada
        this.items = this.items.map((item) => {
          //jika barang berbeda di dalam cart
          if (item.id !== newItem.id) {
            return item;
          } else {
            //jika barang sudah ada , tambah quantity dan totalnya
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },
remove(id) {
  // ambil item yang mau di remove berdasarkan id nya
  const cartItem = this.items.find((item) => item.id === id);

  //jika lebih dari 1
  if(cartItem.quantity > 1) {
    // telusuri 1 1
    this.items = this.items.map((item) => {
      //jika bukan barang yang di klik
      if(item.id !== id) {
        return item;
      } else {
        item.quantity--;
        item.total = item.price * item.quantity;
        this.quantity--;
        this.total -= item.price;
        return item;

      }
    })
  } else if (cartItem.quantity === 1) {
    // jka barangnya sisa 1
    this.items = this.items.filter((item) => item.id !== id);
    this.quantity--;
    this.total -= cartItem.price;

  }
},
  });
});

//konversi ke rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
