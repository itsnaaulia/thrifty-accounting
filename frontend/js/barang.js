let semuaBarang = [];


// AMBIL DATA BARANG DARI SUPABASE

async function tampilkanBarang() {

    const { data, error } = await supabaseClient
        .from("barang")
        .select("*")
        .order("id", { ascending: true });


    if (error) {

        console.error(
            "Error mengambil data barang:",
            error
        );

        tampilkanPesanKosong(
            "Collection unavailable",
            "Data barang belum bisa dimuat."
        );

        return;
    }


    semuaBarang = data || [];

    filterBarang();
}



// TAMPILKAN PRODUCT CARD

function tampilkanDataBarang(data) {

    const grid =
        document.getElementById("productGrid");


    const jumlah =
        document.getElementById("jumlahBarang");


    grid.innerHTML = "";


    jumlah.textContent =
        data.length + (data.length === 1 ? " piece" : " pieces");


    if (data.length === 0) {

        tampilkanPesanKosong(
            "No pieces found",
            "Coba cari dengan kata kunci atau kategori lain."
        );

        return;
    }


    data.forEach(function (barang) {


        const card =
            document.createElement("article");


        card.className =
            "product-card";


        const stok =
            Number(barang.stok);


        let statusText = "Available";
        let statusClass = "";


        if (stok === 0) {

            statusText = "Sold Out";
            statusClass = "sold";

        } else if (stok === 1) {

            statusText = "Only 1 left";

        } else if (stok <= 3) {

            statusText = "Low stock";

        }


        let stockText;


        if (stok === 0) {

            stockText = "Sold out";

        } else if (stok === 1) {

            stockText = "1 piece left";

        } else {

            stockText = stok + " pieces";

        }


        const harga =
            Number(barang.harga_jual)
                .toLocaleString("id-ID");


        card.innerHTML = `

            <div class="product-image">

                <div class="product-image-placeholder">

                    THRIFTY

                    <small>
                        Pre-loved piece
                    </small>

                </div>


                <div class="stock-badge ${statusClass}">
                    ${statusText}
                </div>

            </div>


            <div class="product-info">

                <p class="product-category">
                    ${barang.kategori || "Fashion"}
                </p>


                <h3 class="product-name">
                    ${barang.nama_barang}
                </h3>


                <p class="product-condition">
                    Pre-loved · Carefully selected
                </p>


                <div class="product-bottom">

                    <p class="product-price">
                        Rp ${harga}
                    </p>


                    <span class="product-stock">
                        ${stockText}
                    </span>

                </div>


                <button
                    class="view-button"
                    onclick="lihatProduk(${barang.id})"
                >
                    View piece
                </button>

            </div>

        `;


        grid.appendChild(card);

    });

}



// FILTER BARANG

function filterBarang() {

    const input =
        document.getElementById("cariBarang");


    const select =
        document.getElementById("filterKategori");


    const kataKunci =
        input.value
            .toLowerCase()
            .trim();


    const kategoriDipilih =
        select.value;


    const hasilFilter =
        semuaBarang.filter(function (barang) {


            const nama =
                (barang.nama_barang || "")
                    .toLowerCase();


            const kode =
                (barang.kode_barang || "")
                    .toLowerCase();


            const kategori =
                barang.kategori || "";


            const cocokKataKunci =
                nama.includes(kataKunci) ||
                kode.includes(kataKunci);


            const cocokKategori =
                kategoriDipilih === "" ||
                kategori === kategoriDipilih;


            return (
                cocokKataKunci &&
                cocokKategori
            );

        });


    tampilkanDataBarang(hasilFilter);

}



// PESAN KOSONG

function tampilkanPesanKosong(
    judul,
    pesan
) {

    const grid =
        document.getElementById("productGrid");


    grid.innerHTML = `

        <div class="empty">

            <h3>
                ${judul}
            </h3>

            <p>
                ${pesan}
            </p>

        </div>

    `;

}



// DETAIL PRODUK

function lihatProduk(id) {

    const barang =
        semuaBarang.find(function (item) {

            return item.id === id;

        });


    if (!barang) {
        return;
    }


    const harga =
        Number(barang.harga_jual)
            .toLocaleString("id-ID");


    alert(
        "THRIFTY\n\n" +
        barang.nama_barang +
        "\n" +
        barang.kategori +
        "\n\n" +
        "Harga: Rp " + harga +
        "\n" +
        "Stok: " + barang.stok
    );

}



// EVENT SEARCH

document
    .getElementById("cariBarang")
    .addEventListener(
        "input",
        filterBarang
    );



// EVENT FILTER

document
    .getElementById("filterKategori")
    .addEventListener(
        "change",
        filterBarang
    );



// JALANKAN

tampilkanBarang();