console.log("Welcome to 'Peddy' WEB");

const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
        .then(res => res.json())
        .then(data => {
            displayCategories(data.categories);
        });
};

// "id": 1,
//     "category": "Cat",
//         "category_icon": "https://i.ibb.co.com/N7dM2K1/cat.png"

function displayCategories(categories) {
    // console.log(categories);

    const categoryContainer = document.getElementById('category-container');

    for (const pet of categories) {
        // console.log(pet.category);

        const categoryDiv = document.createElement('div');

        categoryDiv.innerHTML = `
        <div class=" flex justify-center items-center gap-4 p-6 border rounded-lg">
            <img class="w-[56px] h-[56px]" src="${pet.category_icon}" alt="">
            <p class="text-[#131313] font-bold text-2xl">${pet.category}</p>
        </div>
        `;

        categoryContainer.appendChild(categoryDiv);
    }
};


loadCategories();