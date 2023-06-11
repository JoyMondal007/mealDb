import { API_URL,DATA_URL } from './apiURL.js'
import { getJSON } from './fetchAPI.js'

const searchForm=document.querySelector('.search')
const searchInput=document.querySelector('.search__field')

const resultsList=document.querySelector('.results')

const modelOverlay=document.querySelector('.overlay')

const modelWindow=document.querySelector('.add-recipe-window')

const modelCloseBtn=document.querySelector('.btn--close-modal')

const renderSpinner=function(){
   const markup=`
   <div class="spinner">
          <i class="fa-solid fa-spinner"></i>
   </div>
   `
   //resultsList.insertAdjacentHTML("afterbegin",markup)
   resultsList.innerHTML=markup;
}
window.addEventListener("load",renderSpinner)

const loadRecipe=async function(){
   try{
    const data=await getJSON(`${API_URL}${searchInput.value}`)
    console.log(typeof data.meals)
    
    let markup='';
    if(data.meals){
      await data.meals.forEach(meal => {
         markup +=`
         <div class="preview" data-id="${meal.idMeal}">
            <figure><img src="${meal.strMealThumb
               }" data-src="${meal.strMealThumb
               }" alt="Test" /></figure>
      
            <h4 class="preview__title" data-title="${meal.strMeal
            }">${meal.strMeal
               }</h4>
      
            <div class="btn-el">
               <button class="btn--recipie">get recipe</button>
               <i class="fa-regular fa-bookmark"></i>
            </div>
         </div>
         `
       });

    }else{
        markup=`
        <div class="error">
            <div>
            <svg>
                  <use href="src/img/icons.svg#icon-alert-triangle"></use>
            </svg>
            </div>
            <p>No recipes found for your query. Please try again!</p>
        </div>
        `
    }

    resultsList.innerHTML=markup;
    searchInput.value='';
    
   }
   catch(err){
    //throw err
    console.error(err)
   }
}

searchForm.addEventListener('submit',function(e){
   e.preventDefault()
   renderSpinner();
   loadRecipe()
})

const getRecipe= async function(e){
   try{
     e.preventDefault();
     if(e.target.classList.contains('btn--recipie')){
         const targetItem=e.target.parentElement.parentElement;
         console.log(targetItem)
         const data=await getJSON(`${DATA_URL}${targetItem.dataset.id}`)
         const modelMeal=data.meals[0]
         //console.log(modelMeal)
         let markup=`
         <button class="btn--close-modal">&times;</button>
         <div class="recipe_details">
               <h1 class="recipe_title">${modelMeal.strMeal}</h1>
   
               <button class="recipe-type">${modelMeal.strCategory}</button>
               
               <h3 class="instruction">Instructions:</h3>
   
               <p class="instructions_text">${modelMeal.strInstructions
               }</p>
               
               <figure><img class="model-img" src="${modelMeal.strMealThumb
               }" alt="image not found"></figure>
               
   
               <p class="link"> <a href="${modelMeal.strYoutube
               }">watch video</a></p>
         </div>
         `
         modelWindow.innerHTML=markup;
         modelWindow.classList.toggle('hidden')
         modelOverlay.classList.toggle('hidden')
     }
     }catch(err){
         console.error(err);
      }
}

resultsList.addEventListener('click',getRecipe)

modelWindow.addEventListener('click',closeModel)
function closeModel(e){
   if(e.target.classList.contains('btn--close-modal')){
     e.preventDefault()
     const targetEl=e.target.closest('.add-recipe-window');
     targetEl.classList.toggle('hidden')
     modelOverlay.classList.toggle('hidden')
   }
}

const init=function(){
   loadRecipe()
   getRecipe()
}
init()

const bookmarkOverlay=document.querySelector('.bookmarkOverlay')
const seeBookmarkView=document.querySelector('.addBookmark')

resultsList.addEventListener('click',function(e){
   e.preventDefault()
   if(e.target.classList.contains('fa-regular')){
      
      //const clickedBtn=e.target.closest('.fa-');
      //console.log(clickedBtn)
      //clickedBtn.disabled = true;
      const targetPreview=e.target.parentElement.parentElement;
      const targetPrevId=targetPreview.dataset.id;
      const targetImage=targetPreview.firstElementChild.firstElementChild.dataset.src;
      const targetTitle=targetPreview.firstElementChild.nextElementSibling.dataset.title;
      const targetBookmarkBtn=targetPreview.lastElementChild.lastElementChild;
      console.log(targetBookmarkBtn)

      //if(targetBookmarkBtn.clicked){
         
      //}
      
      let markup=`
      <div class="preview" data-id="${targetPrevId}">
         <figure><img src="${targetImage}" data-src="${targetImage}" alt="Test" /></figure>

         <h4 class="preview__title" data-title="${targetTitle}">${targetTitle}</h4>

         <div class="btn-el">
            <button class="btn--recipie">get recipe</button>
            <i class="fa-regular fa-bookmark"></i>
         </div>
      </div>
      `
      bookmarkOverlay.insertAdjacentHTML('afterbegin',markup)
      targetBookmarkBtn.classList.add('fa-solid')
      //targetBookmarkBtn.disabled = true;
      targetBookmarkBtn.classList.add('active')
      
      //const overlayPreviewId=bookmarkOverlay.querySelector('.preview').dataset.id;
      const overlayPreviewAll=bookmarkOverlay.querySelectorAll('.preview');
      //console.log(overlayPreviewAll)
      overlayPreviewAll.forEach(preview => {
         //console.log(preview)
         preview.lastElementChild.lastElementChild.classList.add('fa-solid')
         //if(targetPrevId === preview.dataset.id){}
         //console.log(preview.dataset.id)
         //console.log(targetPrevId)
         console.log(+targetPrevId)
      });
      
   }
})
bookmarkOverlay.addEventListener('click',getRecipe)

bookmarkOverlay.addEventListener('click',closeBookmarkModel)
function closeBookmarkModel(e){
   if(e.target.classList.contains('btn--close-modal')){
     e.preventDefault()
     const targetEl=e.target.closest('.bookmarkOverlay');
     targetEl.classList.toggle('hidden')
   }
}

seeBookmarkView.addEventListener('click',function(){
   bookmarkOverlay.classList.toggle('hidden')
})
//////////////////////////////////////////////////////////////////
/*
 const pagination=document.querySelector('.pagination')
    pagination.addEventListener('click',function(e){
        const btn=e.target.closest('.btn--inline')
        if(!btn) return;
        
        const goToPage=+btn.dataset.goto;
        getSearchResultsPage(goToPage)
    
    })

    const curPage=1;
    const numPages=Math.ceil(10 / 5)

    let markup=''
    if(curPage===1 && numPages > 1){
       markup= `
        <button data-goto='${curPage + 1}' class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
            <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
        </button>
       `
    }

    if(curPage===numPages && numPages > 1){
      markup= `
        <button data-goto='${curPage - 1}' class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="src/img/icons.svg#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
        </button>
        `
    }

    if(curPage < numPages){
      markup= `
        <button data-goto='${curPage - 1}' class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="src/img/icons.svg#icon-arrow-left"></use>
            </svg>
        <span>Page ${curPage - 1}</span>
        </button>

        <button data-goto='${curPage + 1}' class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
                <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
        </button>
        `
    }
    pagination.innerHTML=markup;

const getSearchResultsPage=function (page=1){
   page=1;

    const start= (page-1) * 5;
    const end= page * 5;

    const copy = Object.keys(resultsList);
    console.log(typeof copy)
    copy.slice(start,end)
    
}*/



   