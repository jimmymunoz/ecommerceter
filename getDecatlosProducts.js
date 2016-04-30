//test: http://www.decathlon.fr/C-704182-buts-et-ballons
//START CONSOLE Script
function printMongoDbInsert(table, data){
  return 'db.' + table + '.insert(' + JSON.stringify(data) + ')';
  //{"idProduct": '1',"name": 'VELO KEMMEL',"description": 'Description VELO KEMMEL',"price": 100,"tax": 10,"buyPrice": 70,"image": 'images/products/velo.png',"quantity": 100,"weight": 4000,"category": 52,"productComment": [{}],"productEvaluation": [{}],"creationDate": Date('2014-04-30T14:00:00.000Z'),"modificationDate": Date('2014-04-30T14:00:00.000Z')}
}
var AllProducstData = [];
var staridProduct = 90;
for(key in _productComparatorListingData){
  staridProduct++;
  var fileNameIndex = _productComparatorListingData[key]['pictureUrl'].lastIndexOf("/") + 1;
  var filename = _productComparatorListingData[key]['pictureUrl'].substr(fileNameIndex);

  var price = _productComparatorListingData[key]['price'];
  price = price.replace(" €", "");
  price = price.replace(",", ".");
  price = parseFloat(price);
  var buyPrice = price - (price * 35/100);
  var tax = (price * 10/100);
  var productData = {
    "idProduct": staridProduct,
    "name": _productComparatorListingData[key]['productName'],
    "brand": _productComparatorListingData[key]['brandName'],
    "description": _productComparatorListingData[key]['altTag'],
    "price": price,
    "tax": tax,
    "buyPrice": buyPrice,
    "quantity": Math.floor(Math.random() * 100) + 10,
    "weight": (Math.floor(Math.random() * 100) + 1) * buyPrice,
    "category": "56e1a4235e5cfdb707a1dfd2",
    "creationDate": "Date('2014-04-30T14:00:00.000Z')",
    "modificationDate": "Date('2014-04-30T14:00:00.000Z')",
    "image": "img/catalog/" + filename,
    "productEvaluation": [{
      "evaluationDate": "Date('2016-04-22T18:29:02.000Z')",
      "evaluation": _productComparatorListingData[key]['averageRating'] * 2,
      "user": "56cde164de85d2b134d696ae",
    }],//ratingNumber
    "productComment": [],
    // "_url": "http://www.decathlon.fr/" + _productComparatorListingData[key]['pictureUrl'],
  };
  AllProducstData.push( printMongoDbInsert('products', productData) );
}
console.log(AllProducstData);


//END Script


db.products.insert({"idProduct": '10',"name": 'VELO VTT ROCKRIDER 540 GREY',"description": 'Description VELO VTT ROCKRIDER 540 GREY',"price": 109,"tax": 10.9,"buyPrice": 76.3,"image": 'images/products/velo.png',"quantity": 91,"weight": 4090,"category": 54,"productComment": [{}],"productEvaluation": [{}],"creationDate": Date('2014-04-30T14:00:00.000Z'),"modificationDate": Date('2014-04-30T14:00:00.000Z')})


{
  "_id": "56e1a685e3502a20546959e3",
  "idProduct": 24,
  "name": "VELO VTT ROCKRIDER 300 FEMME",
  "description": "description",
  "price": 120,
  "tax": 120,
  "buyPrice": 5,
  "quantity": 10,
  "weight": 20,
  "category": "56e1a4235e5cfdb707a1dfd2",
  "creationDate": "Date('2014-04-30T14:00:00.000Z')",
  "modificationDate": "Date('2014-04-30T14:00:00.000Z')",
  "__v": 0,
  "image": "img/catalog/velo.jpg",
  "productEvaluation": [],
  "productComment": [],
  "productCommentTotal": 0,
  "productEvaluationResult": 0,
  "categoryName": "VelosMountain"
},

db.products.insert({"idProduct":91,"name":"Wizzy taille 4 orange","brand":"KIPSTA","description":"SPORTS CO Football Football - Wizzy taille 4 orange KIPSTA - Buts et ballons","price":7.99,"tax":0.799,"buyPrice":5.1935,"quantity":109,"weight":119.4505,"category":"56e1a4235e5cfdb707a1dfd2","creationDate":"Date('2014-04-30T14:00:00.000Z')","modificationDate":"Date('2014-04-30T14:00:00.000Z')","image":"img/catalog/classic_c6bda2a1bc824cdbae85c965dfba1585.jpg","productEvaluation":[{"evaluationDate":"Date('2016-04-22T18:29:02.000Z')","evaluation":null,"user":"56cde164de85d2b134d696ae"}],"productComment":[]})

var AllProducstData = [];
jQuery(".product").each(function(element){
  var obj = jQuery(element); 
  var productData = {
    "idProduct": 24,
    "name": obj.find('a[class="product_name"]').html(),
    "description": "description",
    "price": 120,
    "tax": 120,
    "buyPrice": 5,
    "quantity": 10,
    "weight": 20,
    "category": "56e1a4235e5cfdb707a1dfd2",
    "creationDate": "2016-03-10T16:53:25.000Z",
    "modificationDate": "Date('2014-04-30T14:00:00.000Z')",
    "image": "img/catalog/velo.jpg",
    "productEvaluation": [],
    "productComment": [],
  };
  AllProducstData.push(productData);
});
console.log(AllProducstData);







altTag :SPORTS CO Football Footb...IPSTA - Buts et ballons":  
alwaysDisplayPriceFrom: "Y",
averageRating: "4,1",
brandName: "KIPSTA",
crossTheOldPrice: "Y",
crossedPrice: "0,00 €",
currency: "€",
currentPrice: "7,99 €",
decathlonBefore: " ",
decathlonPriceFromTG: "À partir de",
decathlonStarAfterPrice: "*",
decathlonTaxInclusiveComputeNetPrice: "DecathlonTaxInclusiveComputeNetPrice",
disableDisplayPrice: "false",
displayDiscountPercentage: "false",
displayProductInfoPriceStar: "N",
displayPromoPercentage: "Y",
displayTextBeforeOldPrice: "N",
getProductUriForDisplay: "/wizzy-taille-4-orange-id_8082379.html",
isDiscounted: "false",
isGoogleAnalyticsActivated: "N",
isKeepAtiAndComputeNetPrice: "false",
isUserTaxExempted: "false",
oldPricePercentage: "-0 %",
pictureUrl: "/media/808/8082379/class...cdbae85c965dfba1585.jpg",
price: "7,99 €",
priceWithDecimalSpan: "7<span class='cent'>99</span>",
productName: "Wizzy taille 4 orange",
productUrl: "/wizzy-taille-4-orange-id_8082379.html",
promoPercentageColor: "#FF0000",
ratingNumber: "109",ratingPictureIdForDisplay,



<li data-product-iman="117259" data-product-brandname="KIPSTA" data-product-nature="" data-product-breadcrumb-family="BALLONS FOOTBALL LOISIRS" data-product-breadcrumb-subdepartment="Ballons de Foot" data-product-breadcrumb-department="Football" data-product-breadcrumb-universe="Univ Sports collectifs" data-product-availability="1" data-merchandising-id="13477" data-case-number="1" id="product_8351326" data-product-id="8351326" data-product-price="1.99" data-product-name="Sunny 300 taille 1 noir blanc" data-product-type="normal" data-position="0" class="product productshort productshort_lowprice" checkcomparator="Y">
    <img src="/content/website/merch2/lowprice/bg-info.png" alt="" class="product_special">
    <p>
      <label class="block_filter_lbl"></label>
    </p>
    <div class="product_bloc_orga_01">
      <a title="&lt;span='info_it'&gt;Note des utilisateurs :&lt;/span&gt; &lt;span class='info_enstock'&gt;4/5&lt;/span&gt;&lt;br/&gt;&lt;strong&gt;9 avis&lt;/strong&gt;" class="infobulle etoile infobulle_etoile_40" href="#">
      </a>
      <a onclick="return false;" data-track-cookie="8351326|normal" href="/sunny-300-taille-1-noir-blanc-id_8351326.html">
       <img src="/media/835/8351326/classic_84777fe757f54fd4945f577b0870fabe.jpg" title="Sunny 300 taille 1 noir blanc" alt="SPORTS CO Football Football - Sunny 300 taille 1 noir blanc KIPSTA - Buts et ballons" class="product_visuel">
      
      </a>
    <div class="btn_add_to_comparator">
<div class="cubeCheckbox ">
<label>
<input type="checkbox" data-role="none" name="addToComparator">
<span class="indicator addToComparatorLabel">comparer ce produit</span>
</label>
</div>    </div>
    </div>
    <div class="product_bloc_orga_02">
      <a href="#" class="product_brand" title="">KIPSTA</a>
      <a data-track-cookie="8351326|normal" href="/sunny-300-taille-1-noir-blanc-id_8351326.html" class="product_name" title="">SUNNY 300 TAILLE 1 NOIR BLANC</a>
      <div class="product_price">
        
        
        


  <span class="a_partir_de">
      À partir de
  </span>
    <span class="old_price old_price_empty">&nbsp;</span>
  
    <span class="actual_price clear">
1,99&nbsp;€     
    </span>

        <span class="taxMention">
           
        </span>

      </div>
    </div>
    
      <div class="more_info">
        <div class="more_info_content">
          <a href="#" title="">
            PLUS D’INFOS
          </a>
        </div>
      </div>
  <script type="text/javascript" id="productData">
  var _productComparatorListingData ;
    if(typeof _productComparatorListingData == "undefined") {
      _productComparatorListingData = new Object();
    }
    
    var productComparatorData = {};
    _productComparatorListingData["8351326"] = productComparatorData;
    productComparatorData.productName = 'Sunny 300 taille 1 noir blanc';
    productComparatorData.productUrl = '/sunny-300-taille-1-noir-blanc-id_8351326.html';
    productComparatorData.brandName = 'KIPSTA';
    productComparatorData.averageRating = '4';
    productComparatorData.ratingNumber = '9';
    productComparatorData.ratingPictureIdForDisplay = 40;

    productComparatorData.isUserTaxExempted = 'false';
    productComparatorData.isKeepAtiAndComputeNetPrice = 'false';


    productComparatorData.getProductUriForDisplay = '/sunny-300-taille-1-noir-blanc-id_8351326.html';
    productComparatorData.isGoogleAnalyticsActivated = 'N';
    productComparatorData.alwaysDisplayPriceFrom = 'Y';

    productComparatorData.decathlonPriceFromTG = 'À partir de';   
    productComparatorData.isDiscounted = 'false'; 

      productComparatorData.displayDiscountPercentage = 'false';
    productComparatorData.displayTextBeforeOldPrice = 'N';      
    productComparatorData.decathlonBefore = ' ';

    productComparatorData.crossTheOldPrice = 'Y'; 
    productComparatorData.crossedPrice = '0,00&nbsp;€'; 
    productComparatorData.displayPromoPercentage = 'Y';
    productComparatorData.promoPercentageColor = '#FF0000';
    productComparatorData.oldPricePercentage = '-0&nbsp;%'; 
    productComparatorData.disableDisplayPrice = 'false';
    productComparatorData.currentPrice = '1,99&nbsp;€';
    productComparatorData.displayProductInfoPriceStar = 'N';
    productComparatorData.decathlonStarAfterPrice = '*';
    productComparatorData.decathlonTaxInclusiveComputeNetPrice ='DecathlonTaxInclusiveComputeNetPrice';
    productComparatorData.taxMention =' ';
  
    
    
    productComparatorData.pictureUrl = '/media/835/8351326/classic_84777fe757f54fd4945f577b0870fabe.jpg';
      productComparatorData.price = '1,99&nbsp;€';
      productComparatorData.currency = '€';
      productComparatorData.priceWithDecimalSpan = "1&lt;span class='cent'&gt;99&lt;/span&gt;";
    productComparatorData.altTag = 'SPORTS CO Football Football - Sunny 300 taille 1 noir blanc KIPSTA - Buts et ballons';
  </script>
  </li>