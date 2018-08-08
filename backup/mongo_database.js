function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min +1)) + min;
};

for(i=1; i<=953; i++) {
  var insert = random(3,25);
  var serial_number = random(0,20)<10 ?
    i.toLocaleString({minimumIntegerDigits:9})+"PRO" :
    i.toLocaleString({minimumIntegerDigits:9})+"PAR";
   
  for (j=1; j<insert ;j++) {
    var temp1 = random(10,70);
    var temp2 = temp1 +random(-10,0);
    var hour = random(0,23);
    var min = random(0,59);
    var day = random(0,30);
    var month = random(2,6);

    var metal_filling_rate = random(0,20)*5;
    var glass_filling_rate = random(0,20)*5;
    var plastic_filling_rate = random(0,20)*5;
    var glass_at_dumping = 80 + random(0,20);
    var plastic_at_dumping = 80 + random(0,20);
    var metal_at_dumping = 80 + random(0,20);
    var cowl_switch1=random(0,1);
    var cowl_switch2=random(0,1);
    var drawer_switch1=random(0,1);
    var drawer_switch2=random(0,1);
    var user_default = random(0,100)>95?1:0;

    db.Taka.insert({	
      realeased: new Date(2018,01,12,10,45),
      serial_number: serial_number,
      last_used: new Date(2018,month,day,hour,min),
      bin_selected: random(1,3),
      glass_filling_rate: glass_filling_rate,
      metal_filling_rate: metal_filling_rate,
      plastic_filling_rate: plastic_filling_rate,
      glass_after_use: glass_filling_rate>85 ?0: glass_filling_rate - (glass_filling_rate * 30 / 100),
      plastic_after_use: plastic_filling_rate>85 ?0: plastic_filling_rate - (plastic_filling_rate * 30 / 100),
      metal_after_use: metal_filling_rate>85 ?0: metal_filling_rate - (metal_filling_rate * 30 / 100),
      total_glass: random(0,10000),
      total_plastic:random(0,10000),
      total_metal: random(0,10000),
      glass_at_dumping: glass_at_dumping,
      plastic_at_dumping: plastic_at_dumping,
      metal_at_dumping: metal_at_dumping,
      cowl_switch1:cowl_switch1,
      cowl_switch2:cowl_switch2,
      drawer_switch1:drawer_switch1,
      drawer_switch2:drawer_switch2,
      temp1:temp1,
      temp2:temp2,
      overheat1: temp1>65?1:0,
      overheat2: temp2>65?1:0,
      auto_default:((temp1>65) || (temp2>65) || cowl_switch1 || cowl_switch2 || drawer_switch1 || drawer_switch2 )?1:0,
      user_default:user_default,
    });
  }
}
