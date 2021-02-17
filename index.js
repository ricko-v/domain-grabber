const fs = require("fs");
const co = require("cheerio");
const request = require("request");
const readline = require("readline");
const tanya = readline.createInterface({
 input: process.stdin,
 output: process.stdout
});
let i = 10;
let arr = [];
var arrayWitoutDuplicates;

tanya.question("[+] Masukan domain (ex: com) : ", (domain) => {
 tanya.question("[+] Masukan jumlah page : ", (jumlah) => {
  start(domain,jumlah);
  tanya.close();
 });

});

function start(domain,jumlah){
 if(i <= jumlah*10){
  request.get(`https://www.bing.com/search?q=site:.${domain}&first=${i}&FORM=PORE`, (e,r,b) => {
  //  request.get(`http://www.bing.com/search?q=site%3a${domain}&qs=HS&pq=site&sk=PRES1&sc=5-4&cvid=F9E3FD332829466E93AD00B046FC3AC8&sp=1&first=${i}&FORM=PORE`, (e,r,b) => {
   let $ = co.load(b);
   $("#b_results").find("li").each(function(){
    $(this).find("a").each(function(){
     let str = $(this).attr("href") + "";
     let h = str.slice(str.length-domain.length-2, str.length);
     if(h == "."+domain+"/"){
      arr.push(str);
      arrayWitoutDuplicates = Array.from(new Set(arr));
     }
    });
   });
   console.log(i/10+"/"+jumlah+" ==> "+arrayWitoutDuplicates.length);
   i += 10;
   start(domain,jumlah);
  });
 }
 else {
 for(c in arrayWitoutDuplicates){
  fs.appendFile(domain+".txt", arrayWitoutDuplicates[c]+"\n", function (err) {
  if (err) throw err;
  });
 }
 console.log('Grabbed '+arrayWitoutDuplicates.length+' ==> '+domain+".txt");
 }
}
