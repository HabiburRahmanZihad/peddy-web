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
        <div onclick="loadPets('${pet.category}')" class=" flex justify-center items-center gap-4 p-6 border rounded-lg">
            <img class="w-[56px] h-[56px]" src="${pet.category_icon}" alt="">
            <p class="text-[#131313] font-bold text-2xl">${pet.category}</p>
        </div>
        `;

        categoryContainer.appendChild(categoryDiv);
    }
};

const loadPets = (categoryName) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${categoryName}`)
        .then(res => res.json())
        .then(data => {
            displayPets(data.data);
        });
};

const loadPetDetails = (petId) => {
    // console.log(petId);
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
        .then(res => res.json())
        .then(data => {
            displayPetDetails(data.petData);
        });
}

const displayPetDetails = (pet) => {
    // console.log(pet);
    document.getElementById('pet_details').showModal();
    const detailsContainer = document.getElementById('details-container');

    detailsContainer.innerHTML = `
    <div class=" rounded-lg space-y-5">

            <div class="rounded-lg border">
                <img class="w-full rounded-lg" src="${pet.image}" alt="">
            </div>

            <div class="text-[rgba(19,19,19,0.7)] text-base">
                <h1 class="text-xl font-bold text-[#131313]">${pet.pet_name}</h1>
                <p><i class="fa-solid fa-shapes"></i> Breed: ${pet.breed}</p>
                <p><i class="fa-regular fa-calendar"></i> Birth: ${pet.date_of_birth}</p>
                <p><i class="fa-solid fa-venus-mars"></i> Gender: ${pet.gender}</p>
                <p><i class="fa-solid fa-dollar-sign"></i> Price : ${pet.price}$</p>
            </div>

            <div class="border-t border-gray-600 gap-4 pt-5">
                <h2 class="text-xl font-bold text-[#131313]">Details Information</h2>
                <p>${pet.pet_details}</p>
            </div>

        </div>
    `;


}

/**
 * 
"petId": 2,
"breed": "Siamese",
"category": "Cat",
"date_of_birth": "2022-09-05",
"price": 800,
"image": "https://i.ibb.co.com/3Wzz41D/pet-2.jpg",
"gender": "Female",
"pet_details": "This affectionate female Siamese cat is known for her vocal nature and love for attention. Born on September 5, 2022, she enjoys interactive play and snuggles. Fully vaccinated and priced at $800, she's the perfect fit for cat lovers who appreciate an intelligent, engaging, and sociable feline companion.",
"vaccinated_status": "Fully",
"pet_name": "Mia" 
 */

const displayPets = (pets) => {
    // console.log(pets);
    if (pets.length === 0) {
        // console.log('No pets found');
        const petContainer = document.getElementById('petsContainer');
        petContainer.innerHTML = `
        <div id="errorCard"
            class="w-full col-span-full py-[100px] rounded-lg flex flex-col justify-center items-center gap-5  text-center">
                <img class="max-h-[80px]" src="images/error.webp" alt="">
                <p class="text-2xl text-[#131313] font-extrabold">No Information Available</p>
                <p class="text-base text-[#13131370] font-normal w-3/4">It is a long established fact that a
                            reader will be distracted by the readable content of a page when looking at
                            its layout. The point of using Lorem Ipsum is that it has a.</p>
        </div>
        `;
        const petsImage = document.getElementById('petsImage');
        petsImage.innerHTML = `<div class="flex flex-col text-center items-center col-span-2">
                            <img class="w-full" src="images/error.webp" alt="">
                            <p class="text-2xl text-[#131313] font-extrabold">No Information Available</p>
                        </div>`;
        return;
    }


    const petContainer = document.getElementById('petsContainer');
    petContainer.innerHTML = '';
    const petsImage = document.getElementById('petsImage');
    petsImage.innerHTML = '';


    for (const pet of pets) {
        // console.log(pet);

        const petDiv = document.createElement('div');
        const petImageDiv = document.createElement('div');


        petDiv.innerHTML = `
        <div class="p-5 border rounded-lg space-y-5">

            <div class="rounded-lg border">
                <img class="w-full rounded-lg" src="${pet.image}" alt="">
            </div>

            <div class="text-[rgba(19,19,19,0.7)] text-base">
                <h1 class="text-xl font-bold text-[#131313]">${pet.pet_name}</h1>
                <p><i class="fa-solid fa-shapes"></i> Breed: ${pet.breed}</p>
                <p><i class="fa-regular fa-calendar"></i> Birth: ${pet.date_of_birth}</p>
                <p><i class="fa-solid fa-venus-mars"></i> Gender: ${pet.gender}</p>
                <p><i class="fa-solid fa-dollar-sign"></i> Price : ${pet.price}$</p>
            </div>

            <div class="border-t border-gray-600 flex justify-between items-center gap-4 pt-5">
                <div class="btn border text-[#0E7A81] text-sm"><i class="fa-regular fa-thumbs-up"></i></div>
                <div class="btn border text-[#0E7A81] text-lg">Adopt</div>
                <div onclick="loadPetDetails(${pet.petId})" class="btn border text-[#0E7A81] text-lg">Details</div>
            </div>

        </div>
        `;

        petImageDiv.innerHTML = `
        <div onclick="loadPetDetails(${pet.petId})" class="rounded-lg border ">
            <img class="w-full" src="${pet.image}" alt="pets">
        </div>
        `
        petContainer.appendChild(petDiv);
        petsImage.appendChild(petImageDiv);
    }
}




loadCategories();