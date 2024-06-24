var express = require("express");
var router = express.Router();
var exe= require("./../conn");
var bodyparser=require('body-parser')
const { data } = require("jquery");

router.use(express.static('public/'))
router.use(bodyparser.urlencoded({extended:true})) 




async function checkUserLogin(req,res,next){
    if(req.session.admin_id == undefined)
        res.redirect("/login");
    else
        next();
}

router.get("/",checkUserLogin,async function(req,res){ 
    console.log(req.session.admin_id)
    res.render("admin/contact/contact.ejs");
});



// admin registretion
router.get("/register",checkUserLogin,async function(req,res){
    //CREATE TABLE admin_tbl(admin_id INT PRIMARY KEY AUTO_INCREMENT,admin_username VARCHAR(100),admin_mobile VARCHAR(15),admin_email VARCHAR(100),admin_password VARCHAR(30) )
    var admin_tbl_list = await exe(`SELECT * FROM admin_tbl`);
    var obj ={"admin_tbl_list" : admin_tbl_list}
    res.render("admin/login/register.ejs",obj);
});

router.post("/save_admin",async function(req,res){
    var d =req.body;
    var sql = `INSERT INTO admin_tbl(admin_username,admin_mobile,admin_email,admin_password) VALUES ('${d.admin_username}','${d.admin_mobile}','${d.admin_email}','${d.admin_password}')`;
    var data = await exe(sql);
    //res.send(data);
    res.redirect("/register");
});

// admin Login
router.get("/login",async function(req,res){
    res.render("admin/login/login.ejs")
});

router.post("/login_account",async function(req,res){
    var d = req.body;
     var sql =`SELECT * FROM admin_tbl WHERE admin_email='${d.admin_email}' AND admin_password='${d.admin_password}'`;
     var data = await exe(sql);
     console.log(sql)
     if(data.length>0)
     {
        req.session.admin_id = (`admin_id'=${d.admin_id}`)
         res.redirect("/");
        // res.send(data)
    }
     else{
         res.redirect("/login");
     } 
 
 });




 




// newletters start
 router.post('/newsletters',async(req,res)=>{
    var d=req.body;
    var data=await exe(`insert into newsletters(newsletters_name,newsletters_email)values('${d.name}','${d.email}')`)
    console.log(req.body)
    res.send(data)
 })
 router.get('/newsletters',async(req,res)=>{
    var obj={"newsletterrs":await exe(`select * from newsletters`)}
    res.render("admin/newsletter/newsletters.ejs",obj);
 })
 router.get('/delete_newsletters/:id',async(req,res)=>{
    var data=await exe(`delete from newsletters where newsletters_id='${req.params.id}'`)
    res.redirect('/newsletters')
 })
// newsletters end 

// order 
router.post('/submit_order',async(req,res)=>{
    var d=req.body;
    var data=await exe(`insert into order_tbl(product_id,name,email,phone,address,country,city,postalCode)values('${d.product.product_id}','${d.billingInfo.name}','${d.billingInfo.email}','${d.billingInfo.phone}','${d.billingInfo.address}','${d.billingInfo.country}','${d.billingInfo.city}','${d.billingInfo.postalCode}')`)
    res.json(data)
    console.log(data)
})
router.get('/order_lists',async(req,res)=>{
    var obj={"orders":await exe(`select * from order_tbl,product where order_tbl.product_id=product.product_id order by order_tbl_id desc`)}
    res.render('admin/order/order_lists.ejs',obj)
})
router.get('/open_product/:id',async(req,res)=>{
    var obj={"products":await exe(`select * from product where product_id='${req.params.id}'`)};
    res.render('admin/order/open_product.ejs',obj)  
})

// order end





// company Information
router.get("/compnay_info",async function (req, res) {
    var data=await exe(`select * from company_info  where company_info_id=1`);
    var obj={'company_info':data}
  res.render("admin/company_info.ejs",obj);
});
router.post("/update_compnay_information",async function (req, res) {
  if(req.files){
    var file_name=new Date().getTime()+".png";
    req.files.company_logo.mv('public/uploads/'+file_name)
    var sql2=`update company_info set company_logo='${file_name}' where company_info_id=1 `
    var data =await exe(sql2);
  }
  var d = req.body;
  var sql = `update company_info set 
  company_name='${d.company_name}', 
  company_details='${d.company_details}',
  company_contact_no='${d.company_contact_no}',
  company_contact_email='${d.company_contact_email}',
  company_address='${d.company_address}',
  company_location='${d.company_location}',
  company_facebook_link='${d.company_facebook_link}',
  company_twitter_link='${d.company_twitter_link}',
  company_whatsapp_link='${d.company_whatsapp_link}',
  company_instagram_link='${d.company_instagram_link}',
  company_linkedin_link='${d.company_linkedin_link}',
  company_telegram_link='${d.company_telegram_link}'`;
//   res.send(req.body)
var data=await exe(sql);
res.redirect('/compnay_info')
});
router.get('/get_company_info',async(req,res)=>{
    var data=await exe('SELECT * FROM `company_info`');
    res.json(data)
})
// End Company Information





// Product Start
router.get('/add_product',async(req,res)=>{
    res.render('admin/product/add_product.ejs')
})

router.post("/save_product", async function (req, res) {
    var product_image1="";
    if(req.files && req.files.product_image1){
    product_image1=new Date().getTime()+req.files.product_image1.name;
    req.files.product_image1.mv('public/uploads/product/'+product_image1)
}
  var product_image2="";
  if(req.files && req.files.product_image2){
    product_image2=new Date().getTime()+req.files.product_image2.name;
    req.files.product_image2.mv('public/uploads/product/'+product_image2)
  }

  var product_image3="";
  if(req.files && req.files.product_image3){
    product_image3=new Date().getTime()+req.files.product_image3.name;
    req.files.product_image3.mv('public/uploads/product/'+product_image3)
  }
  var product_image4="";
  if(req.files && req.files.product_image4){
    product_image4=new Date().getTime()+req.files.product_image4.name;
    req.files.product_image4.mv('public/uploads/product/'+product_image4)
  }
  
  var d = req.body;
  d.product_information=d.product_information.replace("'","\\'");
  var sql = `insert into product(product_category,product_name,product_price,duplicate_price,product_size,product_color,product_information,product_image1,product_image2,product_image3,product_image4,status)values('${d.product_category}','${d.product_name}','${d.product_price}','${d.duplicate_price}','${d.product_size}','${d.product_color}','${d.product_information}','${product_image1}','${product_image2}','${product_image3}','${product_image4}','success')`;
  var data = await exe(sql);
//   res.send(data);
res.redirect('/add_product')
});
router.get('/product_lists',async(req,res)=>{
    var obj={'products':await exe(`select * from product`)}
    res.render('admin/product/product_lists.ejs',obj)
})


router.get('/delete_product/:id',async(req,res)=>{
    var data=await exe(`delete from product where product_id='${req.params.id}'`)
    res.redirect('/product_lists')
})

router.get('/update_product/:id',async(req,res)=>{
    var obj={"products":await exe(`select * from product where product_id='${req.params.id}'`)}
    res.render('admin/product/update_product.ejs',obj)
})
router.post('/update_product',async(req,res)=>{
    var d=req.body;
    var product_image1="";
    if(req.files && req.files.product_image1){
    product_image1=new Date().getTime()+req.files.product_image1.name;
    req.files.product_image1.mv('public/uploads/product/'+product_image1)
    var data=await exe(`update product set product_image1='${product_image1}' where product_id ='${d.product_id}'`)
}
  var product_image2="";
  if(req.files && req.files.product_image2){
    product_image2=new Date().getTime()+req.files.product_image2.name;
    req.files.product_image2.mv('public/uploads/product/'+product_image2)
    var data=await exe(`update product set product_image2='${product_image2}' where product_id ='${d.product_id}'`)
  }

  var product_image3="";
  if(req.files && req.files.product_image3){
    product_image3=new Date().getTime()+req.files.product_image3.name;
    req.files.product_image3.mv('public/uploads/product/'+product_image3)
    var data=await exe(`update product set product_image3='${product_image3}' where product_id ='${d.product_id}'`)
  }
  var product_image4="";
  if(req.files && req.files.product_image4){
    product_image4=new Date().getTime()+req.files.product_image4.name;
    req.files.product_image4.mv('public/uploads/product/'+product_image4)
    var data=await exe(`update product set product_image4='${product_image4}' where product_id ='${d.product_id}'`)
  }
  
  d.product_information=d.product_information.replace("'","\\'");
  var sql = `update product set product_category='${d.product_category}',product_name='${d.product_name}',product_price='${d.product_price}',duplicate_price='${d.duplicate_price}',product_size='${d.product_size}',product_color='${d.product_color}',product_information='${d.product_information}' where product_id ='${d.product_id}'`;
  var data = await exe(sql);
  res.redirect('/product_lists')
})
router.get('/get_product',async(req,res)=>{
    var data=await exe(`select * from product order by product_id desc`);
    res.json(data)
})
router.get('/get_product/:id',async(req,res)=>{
    var data=await exe(`select * from product where product_id ='${req.params.id}'`);
    res.json(data)
})
// End Product 





// Home page Start
router.get('/manage_home_slider',async(req,res)=>{
    var obj={"slides":await exe(`select * from home_slider`),"products":await exe(`select * from product`)}
    res.render('admin/home/manage_slider.ejs',obj)
})
router.post('/save_home_slider',async(req,res)=>{
    var d=req.body;
    var file_name=new Date().getTime()+'.png';
    req.files.slider_product_image.mv('public/uploads/admin/'+file_name)
    // var sql=`create table home_slider(home_slider_id int primary key auto_increment,slider_heading text,slider_sub_heading text, slider_button_text text,slider_product_name text,slider_description text,slider_product_image text)`
    var sql=`insert into home_slider(slider_heading,slider_sub_heading,slider_button_text,slider_product_name,slider_description,slider_product_image)values('${d.slider_heading}','${d.slider_sub_heading}','${d.slider_button_text}','${d.slider_product_name}','${d.slider_description}','${file_name}')`
    var data=await exe(sql)
    // res.send(data)
    console.log(req.files)  
    res.redirect('/manage_home_slider')
})

router.get('/delete_home_slider/:id',async(req,res)=>{
    var data=await exe(`delete from home_slider where home_slider_id='${req.params.id}'`);
    res.redirect('/manage_home_slider')
})

router.get('/edit_home_slider/:id',async(req,res)=>{
    var obj={"slides":await exe(`select * from home_slider where home_slider_id='${req.params.id}'`),"products":await exe(`select * from product`)}
    res.render('admin/home/update_slider.ejs',obj)
})
router.post('/update_home_slider',async(req,res)=>{
    var d=req.body;
    if(req.files){
        var file_name=new Date().getTime()+'.png';
        req.files.slider_product_image.mv('public/uploads/admin/'+file_name)
        var data=await exe(`update home_slider set slider_product_image='${file_name}' where home_slider_id='${d.home_slider_id}'`)
    }
    var data=await exe(`update home_slider set slider_heading='${d.slider_heading}',slider_sub_heading='${d.slider_sub_heading}',slider_button_text='${d.slider_button_text}',slider_product_name='${d.slider_product_name}',slider_description='${d.slider_description}' where home_slider_id='${d.home_slider_id}'`)
    // res.send(data)
    console.log(req.body)
    res.redirect('/manage_home_slider')
})


router.get('/manage_home_about',async(req,res)=>{
    var obj={"abouts":await exe(`select * from home_about`),"specials":await exe(`select * from home_about_specializing`)}
    res.render('admin/home/manage_home_about.ejs',obj)
})



router.post('/manage_about',async(req,res)=>{
    var d=req.body;
    if(req.files){
         var file_name=new Date().getTime()+'.png';
        req.files.about_main_image.mv('public/uploads/admin/'+file_name)
        var data=await exe(`update home_about set about_main_image ='${file_name}'`)
    }
    var data=await exe(`update home_about set about_heading ='${d.about_heading}'`)
    // res.send(data)
    res.redirect('/manage_home_about')
})
router.post('/manage_sepecializing',async(req,res)=>{
    var d=req.body;
    // console.log(req.files)
    var file_name=new Date().getTime()+'.png';
    req.files.about_specializing_image.mv('public/uploads/admin/'+file_name)
    var data=await exe(`insert into home_about_specializing(about_specializing_heading,about_specializing_descption,about_specializing_image)values('${d.about_specializing_heading}','${d.about_specializing_descption}','${file_name}')`)
res.redirect('/manage_home_about')
})
router.get('/delete_home_specialise/:id',async(req,res)=>{
    var data=await exe(`delete from home_about_specializing where about_specializing_id='${req.params.id}'`)
    res.redirect('/manage_home_about')
})
router.get('/edit_home_specialize/:id',async(req,res)=>{
    var obj={"specials":await exe(`select * from home_about_specializing where about_specializing_id='${req.params.id}'`)}
    res.render('admin/home/update_specializing_about.ejs',obj)
})
router.post('/update_sepecializing',async(req,res)=>{
    var d=req.body;
    if(req.files){
        var file_name=new Date().getTime()+'.png';
        req.files.about_specializing_image.mv('public/uploads/admin/'+file_name)
        var data=await exe(`update home_about_specializing set about_specializing_image ='${file_name}' where about_specializing_id='${d.about_specializing_id}'`)      
    }
    var data=await exe(`update home_about_specializing set about_specializing_heading ='${d.about_specializing_heading}',about_specializing_descption='${d.about_specializing_descption}' where about_specializing_id='${d.about_specializing_id}'`)
    res.redirect('/manage_home_about')
    
})
router.get('/manage_key_features',async(req,res)=>{
    var obj={"features":await exe(`select * from home_key_features`)}
    res.render('admin/home/manage_key_features.ejs',obj)
})
router.post('/manage_key_featues',async(req,res)=>{
    var d=req.body;
    var data=await exe(`insert into home_key_features(key_features_heading,key_features_icon)values('${d.key_features_heading}','${d.key_features_icon}')`);
    // res.send(data)
    res.redirect('/manage_key_features')
})
router.get('/delete_key_featues/:id',async(req,res)=>{
    var data=await exe(`delete from home_key_features where key_features_id='${req.params.id}'`);
    res.redirect('/manage_key_features')
})
router.get('/edit_key_featues/:id',async(req,res)=>{
    var obj={"features":await exe(`select * from home_key_features where key_features_id='${req.params.id}'`)}
    res.render('admin/home/edit_key_featues.ejs',obj)
})
router.post('/update_key_featues',async(req,res)=>{
    var d=req.body;
    var data=await exe(`update home_key_features set key_features_heading='${d.key_features_heading}',key_features_icon='${d.key_features_icon}' where key_features_id='${d.key_features_id}'`)
    // res.send(data)
    res.redirect('/manage_key_features')
})
router.get('/manage_home_benifits',async(req,res)=>{
    var obj={'benifits':await exe(`select * from home_benifits`)}
    res.render('admin/home/manage_home_benifits.ejs',obj)
})

router.post('/manage_home_benifits',async(req,res)=>{
    var d=req.body;
    var data=await exe(`insert into home_benifits(home_benifits_heading,home_benifits_icon)values('${d.benifits_heading}','${d.benifits_icon}')`)
    // res.send(data)
    res.redirect('/manage_home_benifits')
})


router.get('/delete_home_benifits/:id',async(req,res)=>{
    var data=await exe(`delete from home_benifits where home_benifits_id='${req.params.id}'`)
    res.redirect('/manage_home_benifits')
})

router.get('/edit_home_benifits/:id',async(req,res)=>{
    var obj={"benifits":await exe(`select * from home_benifits where home_benifits_id='${req.params.id}'`)}
    res.render('admin/home/edit_home_benifits.ejs',obj)
})
router.post('/update_home_benifits',async(req,res)=>{
    var d=req.body;
    var data=await exe(`update home_benifits set home_benifits_heading='${d.benifits_heading}',home_benifits_icon='${d.benifits_icon}' where home_benifits_id='${d.home_benifits_id}'`)
    res.redirect('/manage_home_benifits')
})
router.get('/manage_home_sale',async(req,res)=>{
    var obj={"sales":await exe(`select * from home_grand_sale`),"products":await exe(`select * from product`)}
    res.render('admin/home/manage_home_sale.ejs',obj)
})
router.post('/manage_home_sale',async(req,res)=>{
    var d=req.body;
    if(req.files){
        var file_name=new Date().getTime()+'.png';
        req.files.grand_sale_image.mv('public/uploads/admin/'+file_name)
        var data=await exe(`update home_grand_sale set grand_sale_image ='${file_name}'`)   
    }
    var data=await exe(`update home_grand_sale set grand_sale_product_name='${d.grand_sale_product_name}',grand_sale_heading='${d.grand_sale_heading}',grand_sale_button_text='${d.grand_sale_button_text}',grand_sale_description='${d.grand_sale_description}',grand_sale_sub_description='${d.grand_sale_sub_description}'`)
    // res.send(data)
    res.redirect('manage_home_sale')
})
router.get('/manage_home_new_features',async(req,res)=>{
    var obj={"new_features":await exe(`select * from home_new_features`)}
    res.render('admin/home/manage_home_new_features.ejs',obj)
})
router.post('/manage_home_new_features',async(req,res)=>{
    var d=req.body;
    // console.log(req.files)
    var file_name=new Date().getTime()+'.png';
    req.files.new_features_image.mv('public/uploads/admin/'+file_name)    
    var data=await exe(`insert into home_new_features(new_features_heading,new_features_sub_heading,new_features_image)values('${d.new_features_heading}','${d.new_features_sub_heading}','${file_name}')`)
    // res.send(data)
    res.redirect('/manage_home_new_features')
})
router.get('/delete_new_home_features/:id',async(req,res)=>{
    var data=await exe(`delete from home_new_features where home_new_features_id='${req.params.id}'`)
    res.redirect('/manage_home_new_features')
})
router.get('/edit_new_home_features/:id',async(req,res)=>{
    var obj={"new_featues":await exe(`select * from home_new_features where home_new_features_id='${req.params.id}'`)}
    res.render('admin/home/edit_new_home_features.ejs',obj)
})
router.post('/update_home_new_features',async(req,res)=>{
    var d=req.body;
    if(req.files){
        var file_name=new Date().getTime()+'.png';
        req.files.new_features_image.mv('public/uploads/admin/'+file_name)    
        var data=await exe(`update home_new_features set new_features_image ='${file_name}' where home_new_features_id ='${d.home_new_features_id}'`)   
    }
    var data=await exe(`update home_new_features set new_features_heading='${d.new_features_heading}',new_features_sub_heading='${d.new_features_sub_heading}' where home_new_features_id ='${d.home_new_features_id}'`)
    // res.send(data)
    res.redirect('/manage_home_new_features')
})
router.get('/manage_home_client_says',async(req,res)=>{
    var obj={"clients":await exe(`select * from home_client_says`)}
    res.render('admin/home/manage_home_client_says.ejs',obj)
})
router.post('/manage_client_says',async(req,res)=>{
    var d=req.body;
        var file_name=new Date().getTime()+'.png';
        req.files.client_image.mv('public/uploads/admin/'+file_name)    
        var data=await exe(`insert into home_client_says(client_name,client_profession,what_client_says,client_image)values('${d.client_name}','${d.client_profession}','${d.what_client_says}','${file_name}')`);
        // res.send(data)
        res.redirect('/manage_home_client_says')
})
router.get('/delete_home_client_says/:id',async(req,res)=>{
    var data=await exe(`delete from home_client_says where home_client_says_id='${req.params.id}'`)
    res.redirect('/manage_home_client_says')
})
router.get('/edit_home_client_says/:id',async(req,res)=>{
    var obj={"clients":await exe(`select * from home_client_says where home_client_says_id='${req.params.id}'`)}
    res.render('admin/home/edit_home_client_says.ejs',obj)
})
router.post('/update_client_says',async(req,res)=>{
    var d=req.body;
    if(req.files){
        var file_name=new Date().getTime()+'.png';
        req.files.client_image.mv('public/uploads/admin/'+file_name)    
        var data=await exe(`update home_client_says set client_image='${file_name}' where home_client_says_id='${d.home_client_says_id}'`)
    }
    var data=await exe(`update home_client_says set client_name ='${d.client_name}',client_profession ='${d.client_profession}',what_client_says ='${d.what_client_says}'where home_client_says_id='${d.home_client_says_id}'`)
    // res.send(data)
    res.redirect('/manage_home_client_says')
})
router.get('/get_home_slider',async(req,res)=>{
    var data=await exe(`select * from home_slider`)
    res.json(data)
})
router.get('/get_home_about',async(req,res)=>{
    var data=await exe(`select * from home_about`);
    res.json(data)
})

router.get('/get_home_about_specialization',async(req,res)=>{
    var data=await exe(`select * from home_about_specializing`);
    res.json(data)
})

router.get('/get_home_key_features',async(req,res)=>{
    var data=await exe(`select * from home_key_features`);
    res.json(data)
})

router.get('/get_home_benifits',async(req,res)=>{
    var data=await exe(`select * from home_benifits`);
    res.json(data)
})


router.get('/get_home_grand_sale',async(req,res)=>{
    var data=await exe(`select * from home_grand_sale`);
    res.json(data)
})

router.get('/get_home_new_feature',async(req,res)=>{
    var data=await exe(`select * from home_new_features`);
    res.json(data)
})
router.get('/get_home_blog',async(req,res)=>{
    var data=await exe(`select * from home_client_says`);
    res.json(data)
})
// End Home Page 



// About Page Start

router.get('/manage_about_slider',async(req,res)=>{
    var obj={'slides':await exe(`select * from about_slider`)}
    res.render('admin/about/manage_about_slider.ejs',obj)
})
router.post('/update_about_slider',async(req,res)=>{
    var d=req.body;
    if(req.files){

    var file_name=new Date().getTime()+'.png';
    req.files.slider_image.mv('public/uploads/admin/'+file_name)
    var data=await exe(`update about_slider set slider_image='${file_name}')`)
}
    var data=await exe(`update about_slider set slider_heading='${d.slider_heading}'`)
    // res.send(data)
    res.redirect('/manage_about_slider')
})

router.get('/manage_about_mission',async(req,res)=>{
    var obj={"missions":await exe(`select * from about_mission`),"vissions":await exe(`select * from about_vision`)}
    res.render('admin/about/manage_about_mission_vision.ejs',obj)
})
router.post('/update_about_mission',async(req,res)=>{
    var d=req.body;
    if(req.files){
    var file_name=new Date().getTime()+'.png';
    req.files.mission_image.mv('public/uploads/admin/'+file_name)
    var data=await exe(`update about_mission set mission_image='${file_name}'`)
}
    var data=await exe(`update about_mission set mission_heading='${d.mission_heading}',slider_description='${d.slider_description}',missin_sub_description='${d.missin_sub_description}'`)
    res.redirect('/manage_about_mission')

})

router.post('/update_about_vision',async(req,res)=>{
    var d=req.body;
    if(req.files){
    var file_name=new Date().getTime()+'.png';
    req.files.vision_image.mv('public/uploads/admin/'+file_name)
    var data=await exe(`update about_vision set vision_image='${file_name}'`)
}
    var data=await exe(`update about_vision set vision_heading='${d.vision_heading}',vision_description='${d.vision_description}',vision_sub_description='${d.vision_sub_description}'`)
    res.redirect('/manage_about_mission')
})
router.get('/manage_about_core_values',async(req,res)=>{
    var obj={"cors":await exe(`select * from about_cors_values`)}
    res.render('admin/about/manage_about_core_values.ejs',obj)
})
router.post('/manage_about_cors_values',async(req,res)=>{
    var d=req.body;
    var file_name=new Date().getTime()+'.png';
    req.files.cors_value_image.mv('public/uploads/admin/'+file_name)
    var data=await exe(`insert into about_cors_values(cors_value_heading,cors_value_image)values('${d.cors_value_heading}','${file_name}')`)
    // res.send(data)
    res.redirect('/manage_about_core_values')
})
router.get('/delete_about_cors_value/:id',async(req,res)=>{
    var data=await exe(`delete from about_cors_values where about_cors_values_id='${req.params.id}'`)
    res.redirect('/manage_about_core_values')
})
router.get('/edit_about_cors_value/:id',async(req,res)=>{
    var obj={"cors":await exe(`select * from about_cors_values where about_cors_values_id='${req.params.id}'`)}
    res.render('admin/about/edit_about_cors_value.ejs',obj)
})
router.post('/update_about_cors_values',async(req,res)=>{
    var d=req.body;
    if(req.files){
        var file_name=new Date().getTime()+'.png';
    req.files.cors_value_image.mv('public/uploads/admin/'+file_name)
        var data=await exe(`update about_cors_values set cors_value_image='${file_name}' where about_cors_values_id='${d.about_cors_values_id}'`)
    }
    var data=await exe(`update about_cors_values set cors_value_heading='${d.cors_value_heading}' where about_cors_values_id='${d.about_cors_values_id}'`)
    res.redirect('/manage_about_core_values')
    // res.send(data)
})
router.get('/manage_about_counting',async(req,res)=>{
    var obj={"countings":await exe(`select * from about_counting`)}
    res.render('admin/about/manage_about_counting.ejs',obj)
})
router.post('/manage_about_counting',async(req,res)=>{
    var d=req.body;
    var data=await exe(`insert into about_counting(counting_heading	,counting_class_name,counting_number)values('${d.counting_heading}','${d.counting_class_name}','${d.counting_number}')`)
    // res.send(data)
    res.redirect('/manage_about_counting')
})
router.get('/delete_about_counting/:id',async(req,res)=>{
    var data=await exe(`delete from about_counting where about_counting_id='${req.params.id}'`)
    res.redirect('/manage_about_counting')
})
router.get('/edit_about_counting/:id',async(req,res)=>{
    var obj={"countings":await exe(`select * from about_counting where about_counting_id='${req.params.id}'`)}
    res.render('admin/about/edit_about_counting.ejs',obj)
})
router.post('/update_about_counting',async(req,res)=>{
    var d=req.body;
    var data=await exe(`update about_counting set counting_heading='${d.counting_heading}',counting_class_name='${d.counting_class_name}',counting_number='${d.counting_number}' where about_counting_id='${d.about_counting_id}'`)
    res.redirect('/manage_about_counting')
})
router.get('/manage_about_team',async(req,res)=>{
    var obj={"members":await exe(`select * from about_team_member`)}
    res.render('admin/about/manage_about_team.ejs',obj)
})
router.post('/manage_about_team_member',async(req,res)=>{
    var d=req.body;
    var file_name=new Date().getTime()+'.png';
    req.files.member_image.mv('public/uploads/admin/'+file_name)
    var data=await exe(`insert into about_team_member(member_name,member_profession,member_image)values('${d.member_name}','${d.member_profession}','${file_name}')`)
    res.redirect('/manage_about_team')
})
router.get('/delete_about_team/:id',async(req,res)=>{
    var data=await exe(`delete from about_team_member where about_team_member_id='${req.params.id}'`)
    res.redirect('/manage_about_team')
})
router.get('/update_about_team/:id',async(req,res)=>{
    var obj={"teams":await exe(`select * from about_team_member where about_team_member_id='${req.params.id}'`)}
    res.render('admin/about/update_about_team.ejs',obj)
})

router.post('/update_about_team_member',async(req,res)=>{
    var d=req.body;
    if(req.files){
        var file_name=new Date().getTime()+'.png';
    req.files.member_image.mv('public/uploads/admin/'+file_name)
        var data=await exe(`update about_team_member set member_image='${file_name}' where about_team_member_id='${d.about_team_member_id}'`)
    }
    var data=await exe(`update about_team_member set member_name='${d.member_name}',member_profession='${d.member_profession}' where about_team_member_id='${d.about_team_member_id}'`)
    res.redirect('/manage_about_team')
})

router.get('/get_about_slider',async(req,res)=>{
    var data=await exe(`select * from about_slider`);
    res.json(data)
})

router.get('/get_about_slider',async(req,res)=>{
    var data=await exe(`select * from about_slider`);
    res.json(data)
})
router.get('/get_about_mission',async(req,res)=>{
    var data=await exe(`select * from about_mission`);
    res.json(data)
})

router.get('/get_about_vision',async(req,res)=>{
    var data=await exe(`select * from about_vision`);
    res.json(data)
})


router.get('/get_about_cors_values',async(req,res)=>{
    var data=await exe(`select * from about_cors_values`);
    res.json(data)
})

router.get('/get_about_counting',async(req,res)=>{
    var data=await exe(`select * from about_counting`);
    res.json(data)
})


router.get('/get_about_team_member',async(req,res)=>{
    var data=await exe(`select * from about_team_member`);
    res.json(data)
})

// About Page End








// contact header 

router.get("/contact_header", async function(req,res){
    //CREATE TABLE contact_header (contact_header_id INT PRIMARY KEY AUTO_INCREMENT, header_title TEXT,header_image TEXT);
    var contact_header_list = await exe(`SELECT * FROM contact_header`);
    var obj ={"contact_header_list" : contact_header_list}
    res.render("admin/contact/contact_header.ejs",obj);
});
router.post("/update_contact_header", async function(req,res){
    var d = req.body;
    var file_name = new Date().getTime()+".png";
    req.files.header_image.mv("public/uploads/admin/contact/header/"+file_name);
    // var sql = `INSERT INTO contact_header (header_title,header_image) VALUES('${d.header_title}','${file_name}')`;
    var sql = `UPDATE contact_header SET header_title = '${d.header_title}' , header_image = '${file_name}'`;
    var data = await exe (sql);
    res.redirect("/contact_header");
});

router.get('/contact_header_api',async function(req,res){
    var Contact_header = await exe(`SELECT * FROM contact_header`);
    res.send(Contact_header);
});


//contact info

router.get("/contact_info",async function(req,res){
    //CREATE TABLE contact_info (contact_info_id INT PRIMARY KEY AUTO_INCREMENT,phone VARCHAR(15),email TEXT,address TEXT, facebook TEXT,twitter TEXT,linkedin TEXT,instagram TEXT );
    var contact_info_list = await exe(`SELECT * FROM contact_info`);
    var obj = {"contact_info_list":contact_info_list}
    res.render("admin/contact/contact_info.ejs",obj);
});

router.post("/update_contact_info", async function(req,res){
    var d = req.body;
    // var sql = `INSERT INTO contact_info (phone ,email ,address , facebook ,twitter ,linkedin ,instagram ) VALUES('${d.phone}','${d.email}','${d.address}','${d.facebook}','${d.twitter}','${d.linkedin}','${d.instagram}')`;

    var sql = `UPDATE contact_info SET phone = '${d.phone}',email = '${d.email}',address = '${d.address}', facebook = '${d.facebook}',twitter = '${d.twitter}',linkedin = '${d.linkedin}',instagram = '${d.instagram}'`;

    var data = await exe (sql);
    res.redirect("/contact_info");
});

router.get('/contact_info_api',async function(req,res){
    var Contact_info = await exe(`SELECT * FROM contact_info`);
    res.send(Contact_info);
});

// map 
router.get("/contact_map",async function(req,res){
    //CREATE TABLE contact_map (contact_map INT PRIMARY KEY AUTO_INCREMENT,location TEXT );
    var contact_map_list = await exe(`SELECT * FROM contact_map`);
    var obj = {"contact_map_list":contact_map_list}
    res.render("admin/contact/contact_map.ejs",obj);
});

router.post("/update_contact_map", async function(req,res){
    var d = req.body;
    // var sql = `INSERT INTO contact_map (location) VALUES('${d.location}')`;

    var sql = `UPDATE contact_map SET location = '${d.location}'`;

    var data = await exe (sql);
    res.redirect("/contact_map");
});

router.get('/contact_map_api',async function(req,res){
    var Contact_map = await exe(`SELECT * FROM contact_map`);
    res.send(Contact_map);
});

// we work with (www)

router.get("/contact_www",async function(req,res){
   //CREATE TABLE contact_www (contact_www_id INT PRIMARY KEY AUTO_INCREMENT, company_name TEXT, company_logo Text);
   var contact_www_list = await exe(`SELECT * FROM contact_www`);
   var obj = {"contact_www_list":contact_www_list};
   res.render("admin/contact/contact_www.ejs",obj);
});

router.post("/save_contact_www", async function(req,res){
    var d = req.body;
    var file_name = new Date().getTime()+".png";
    req.files.company_logo.mv("public/uploads/admin/contact/we work with/"+file_name)
    var sql = `INSERT INTO contact_www (company_name , company_logo ) VALUES('${d.company_name}','${file_name}')`;

    var data = await exe (sql);
    res.redirect("/contact_www");
});

router.get("/edit_contact_www/:id",async function(req,res){
     var contact_www_info = await exe(`SELECT * FROM contact_www WHERE contact_www_id = '${req.params.id}'`);
     var data = {"contact_www_info":contact_www_info}
     res.render("admin/contact/edit_contact_www.ejs",data);
 });

router.post("/update_contact_www", async function(req,res){
    var d = req.body;
    var file_name = new Date().getTime()+".png";
    req.files.company_logo.mv("public/uploads/admin/contact/we work with/"+file_name)

    var sql = `UPDATE contact_www SET company_name = '${d.company_name}' ,company_logo = '${file_name}'`;

    var data = await exe (sql);
    res.redirect("/contact_www");
});

router.get("/delete_contact_www/:id",async function(req,res){
    var sql = `DELETE FROM contact_www WHERE contact_www_id = '${req.params.id}'`;
    var data = await exe(sql);
    res.redirect("/contact_www");
});

router.get('/contact_www_api',async function(req,res){
    var Contact_www = await exe(`SELECT * FROM contact_www`);
    res.send(Contact_www);
});

// inquiry_list 
router.get('/inquiry_list', async (req, res) => {
    // CREATE TABLE inquiry_list (inquiry_list_id INT PRIMARY KEY AUTO_INCREMENT ,name VARCHAR(100),email VARCHAR(100),phone VARCHAR(15),address TEXT,message TEXT)
   var sql = `SELECT * FROM inquiry_list`
   var inquiry_list_data = await exe(sql);
   res.render('admin/contact/inquiry_list.ejs',{"inquiry_list_data":inquiry_list_data})
 });

 router.post('/inquiry_list',async (req, res) => {
   var d = req.body;
   var sql = `INSERT INTO inquiry_list (name, email, phone, address, message) 
   VALUES ('${d.name}', '${d.email}', '${d.phone}', '${d.address}', '${d.message}')`;
   var data = await exe(sql);
   res.send(data);
 });
 

 
 router.get('/delete_inquiry_list/:id', async (req, res) => {
   var sql = `DELETE FROM inquiry_list  where inquiry_list_id = '${req.params.id}'`;
   var data = await exe(sql);
   res.redirect('/inquiry_list')
 });


//  inquiry end 
// contact end 


// Galley start

router.get("/gallery_header", async function(req,res){
    //CREATE TABLE gallery_header (gallery_header_id INT PRIMARY KEY AUTO_INCREMENT, header_title TEXT,header_image TEXT);
    var gallery_header_list = await exe(`SELECT * FROM gallery_header`);
    var obj ={"gallery_header_list" : gallery_header_list}
    res.render("admin/gallery/gallery_header.ejs",obj);
});
router.post("/update_gallery_header", async function(req,res){
    var d = req.body;
    var file_name = new Date().getTime()+".png";
    req.files.header_image.mv("public/uploads/admin/gallery/header/"+file_name);
    var sql = `INSERT INTO gallery_header (header_title,header_image) VALUES('${d.header_title}','${file_name}')`;
    // var sql = `UPDATE gallery_header SET header_title = '${d.header_title}' , header_image = '${file_name}'`;
    var data = await exe (sql);
    res.redirect("/gallery_header");
});

router.get('/gallery_header_api',async function(req,res){
    var gallery_header = await exe(`SELECT * FROM gallery_header`);
    res.send(gallery_header);
});

// gallery images
router.get("/gallery_image", async function(req,res){
    //CREATE TABLE gallery_image (gallery_image_id INT PRIMARY KEY AUTO_INCREMENT,gallery_image TEXT);
    var gallery_image_list = await exe(`SELECT * FROM gallery_image`);
    var obj ={"gallery_image_list" : gallery_image_list}
    res.render("admin/gallery/gallery_image.ejs",obj);
});

router.post("/save_gallery_image", async function(req,res){
    var d = req.body;
    var file_name = new Date().getTime()+".png";
    req.files.gallery_image.mv("public/uploads/admin/gallery/images/"+file_name);
    var sql = `INSERT INTO gallery_image (gallery_image) VALUES('${file_name}')`;
    // var sql = `UPDATE gallery_image SET  gallery_image = '${file_name}'`;
    var data = await exe (sql);
    res.redirect("/gallery_image");
});

router.get("/edit_gallery_image/:id",async function(req,res){
    var gallery_image_info = await exe(`SELECT * FROM gallery_image WHERE gallery_image_id = '${req.params.id}'`);
    var data = {"gallery_image_info":gallery_image_info}
    res.render("admin/gallery/edit_gallery_image.ejs",data);
});


router.post("/update_gallery_image", async function(req,res){
    var d = req.body;
    var file_name = new Date().getTime()+".png";
    req.files.gallery_image.mv("public/uploads/admin/gallery/images/"+file_name);
    var sql = `UPDATE gallery_image SET  gallery_image = '${file_name}' WHERE gallery_image_id = '${d.gallery_image_id}'`;
    var data = await exe (sql);
    res.redirect("/gallery_image");
});

router.get("/delete_gallery_image/:id",async function(req,res){
    var sql = `DELETE FROM gallery_image WHERE gallery_image_id = '${req.params.id}'`;
    var data = await exe(sql);
    res.redirect("/gallery_image");
});

router.get('/gallery_image_api',async function(req,res){
    var Gallery_image = await exe(`SELECT * FROM gallery_image`);
    res.send(Gallery_image);
});

// Galley end

// Services start

router.get("/services_header", async function(req,res){
    //CREATE TABLE services_header (services_header_id INT PRIMARY KEY AUTO_INCREMENT, header_title TEXT,header_image TEXT);
    var services_header_list = await exe(`SELECT * FROM services_header`);
    var obj ={"services_header_list" : services_header_list}
    res.render("admin/services/services_header.ejs",obj);
});
router.post("/update_services_header", async function(req,res){
    var d = req.body;
    var file_name = new Date().getTime()+".png";
    req.files.header_image.mv("public/uploads/admin/services/header/"+file_name);
    // var sql = `INSERT INTO services_header (header_title,header_image) VALUES('${d.header_title}','${file_name}')`;
    var sql = `UPDATE services_header SET header_title = '${d.header_title}' , header_image = '${file_name}'`;
    var data = await exe (sql);
    res.redirect("/services_header");
});

router.get('/services_header_api',async function(req,res){
    var Services_header = await exe(`SELECT * FROM services_header`);
    res.send(Services_header);
});

// What We Offer (wwo)
router.get("/what_we_offer", async function(req,res){
    //CREATE TABLE what_we_offer (what_we_offer_id INT PRIMARY KEY AUTO_INCREMENT, wwo_title TEXT, wwo_disc TEXT);
    var what_we_offer_list = await exe(`SELECT * FROM what_we_offer`);
    var obj ={"what_we_offer_list" : what_we_offer_list}
    res.render("admin/services/what_we_offer.ejs",obj);
});
router.post("/update_what_we_offer", async function(req,res){
    var d = req.body;
    var sql = `INSERT INTO what_we_offer (wwo_title, wwo_disc) VALUES('${d.wwo_title}','${d.wwo_disc}')`;
    // var sql = `UPDATE what_we_offer SET wwo_title = '${d.wwo_title}' ,  wwo_disc = '${d.wwo_disc}'`;
    var data = await exe (sql);
    res.redirect("/what_we_offer");
});

router.get('/what_we_offer_api',async function(req,res){
    var what_we_offer = await exe(`SELECT * FROM what_we_offer`);
    res.send(what_we_offer);
});

// Our vision

router.get("/our_vision", async function(req,res){
    //CREATE TABLE our_vision (our_vision_id INT PRIMARY KEY AUTO_INCREMENT, our_vision_title TEXT, our_vision_disc TEXT,our_vision_image TEXT);
    var our_vision_list = await exe(`SELECT * FROM our_vision`);
    var obj ={"our_vision_list" : our_vision_list}
    res.render("admin/services/our_vision.ejs",obj);
});
router.post("/update_our_vision", async function(req,res){
    var d = req.body;
    var file_name = new Date().getTime()+".png";
    req.files.our_vision_image.mv("public/uploads/admin/services/our vision/"+file_name);
    // var sql = `INSERT INTO our_vision (our_vision_title, our_vision_disc, our_vision_image) VALUES('${d.our_vision_title}',"${d.our_vision_disc}",'${file_name}')`;
    var sql = `UPDATE our_vision SET our_vision_title = '${d.our_vision_title}' ,  our_vision_disc = "${d.our_vision_disc}",our_vision_image = '${file_name}'`;
    var data = await exe (sql);
    res.redirect("/our_vision");
});

router.get('/our_vision_api',async function(req,res){
    var our_vision = await exe(`SELECT * FROM our_vision`);
    res.send(our_vision);
});


// Our mission

router.get("/our_mission", async function(req,res){
    //CREATE TABLE our_mission (our_mission_id INT PRIMARY KEY AUTO_INCREMENT, our_mission_title TEXT, our_mission_disc TEXT,our_mission_image TEXT);
    var our_mission_list = await exe(`SELECT * FROM our_mission`);
    var obj ={"our_mission_list" : our_mission_list}
    res.render("admin/services/our_mission.ejs",obj);
});
router.post("/update_our_mission", async function(req,res){
    var d = req.body;
    var file_name = new Date().getTime()+".png";
    req.files.our_mission_image.mv("public/uploads/admin/services/our mission/"+file_name);
    // var sql = `INSERT INTO our_mission (our_mission_title, our_mission_disc, our_mission_image) VALUES('${d.our_mission_title}',"${d.our_mission_disc}",'${file_name}')`;
    var sql = `UPDATE our_mission SET our_mission_title = '${d.our_mission_title}' ,  our_mission_disc = "${d.our_mission_disc}",our_mission_image = '${file_name}'`;
    var data = await exe (sql);
    res.redirect("/our_mission");
});

router.get('/our_mission_api',async function(req,res){
    var our_mission = await exe(`SELECT * FROM our_mission`);
    res.send(our_mission);
});

//service card

router.get("/service_card", async function(req,res){
    //CREATE TABLE service_card (service_card_id INT PRIMARY KEY AUTO_INCREMENT, service_card_title TEXT,service_card_image TEXT);
    var service_card_list = await exe(`SELECT * FROM service_card`);
    var obj ={"service_card_list" : service_card_list}
    res.render("admin/services/service_card.ejs",obj);
});

router.post("/save_service_card", async function(req,res){
    var d = req.body;
    var file_name = new Date().getTime()+".png";
    req.files.service_card_image.mv("public/uploads/admin/services/service card/"+file_name);
    var sql = `INSERT INTO service_card (service_card_title, service_card_image) VALUES('${d.service_card_title}','${file_name}')`;
    // var sql = `UPDATE service_card SET service_card_title = '${d.service_card_title}',service_card_image = '${file_name}'`;
    var data = await exe (sql);
    res.redirect("/service_card");
});

router.get("/edit_service_card/:id",async function(req,res){
    var service_card_info = await exe(`SELECT * FROM service_card WHERE service_card_id = '${req.params.id}'`);
    var data = {"service_card_info":service_card_info}
    res.render("admin/services/edit_service_card.ejs",data);
});

router.post("/update_service_card", async function(req,res){
    var d = req.body;
    var file_name = new Date().getTime()+".png";
    req.files.service_card_image.mv("public/uploads/admin/services/service card/"+file_name);
    // var sql = `INSERT INTO service_card (service_card_title, service_card_image) VALUES('${d.service_card_title}','${file_name}')`;
    var sql = `UPDATE service_card SET service_card_title = '${d.service_card_title}',service_card_image = '${file_name}' WHERE service_card_id = '${d.service_card_id}'`;
    var data = await exe (sql);
    res.redirect("/service_card");
});


router.get("/delete_service_card/:id",async function(req,res){
    var sql = `DELETE FROM service_card WHERE service_card_id = '${req.params.id}'`;
    var data = await exe(sql);
    res.redirect("/service_card");
});

router.get('/service_card_api',async function(req,res){
    var Service_card = await exe(`SELECT * FROM service_card`);
    res.send(Service_card);
});
// Services end
// enquiry start
router.post('/inquiry_form', async (req, res) => {
    var d=req.body;
    var data=await exe(`insert into home_inquiry(home_inquiry_name,home_inquiry_mobile,home_inquiry_email,home_inquiry_address)values('${d.name}','${d.phone}','${d.email}','${d.address}')`)
    res.status(200).json({ message: 'Form submitted successfully' });
    // console.log(data)
  });

  router.get('/get_inquiry_form',async(req,res)=>{
    var obj={"inquiry":await exe(`select * from home_inquiry`)}
    res.render('admin/contact/home_inquiry_list.ejs',obj)
  })
  router.get('/delete_home_inquiry_list/:id',async(req,res)=>{
    var data=await exe(`delete from home_inquiry where home_inquiry_id='${req.params.id}'`)
    res.redirect('/get_inquiry_form')
  })
// enquiry end

module.exports = router;