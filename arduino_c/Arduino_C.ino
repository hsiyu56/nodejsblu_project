#include <Wire.h>
#include <MPU6050_light.h>
#include <SoftwareSerial.h>
#include <math.h>

//bluetooth
SoftwareSerial HM10(8, 7); // RX = 8, TX = 7

MPU6050 mpu(Wire);
long timer = 0;
int num1 = 0;
int num2 = 0;
int num3 = 0;
int num4 = 0;
int num5 = 0;
int count1 = 0;
int count2 = 0;
int count3 = 0;
int count4 = 0;
int count5 = 0;
int used = 0;
float ti,be,be1,be2, acc1, acc2, acc3 = 0;

void setup() 
{
  Serial.begin(115200);
  //bluetooth
  HM10.begin(9600);
  // 設定 MPU6050
  Wire.begin();
  byte status = mpu.begin();
  Serial.print(F("MPU6050 status: "));
  Serial.println(status);
  while(status!=0){ } // stop everything if could not connect to MPU6050
  Serial.println(F("Calculating offsets, do not move MPU6050"));
  delay(1000);
  mpu.calcOffsets(true,true); // gyro and accelero
  Serial.println("Done!\n");

}

void loop()
{
  mpu.update();
  if(HM10.isListening()){
    ti = millis();
    //String aa = String(mpu.getAccX()) + "," + String(mpu.getAccY()) + "," + String(mpu.getAccZ());
    //HM10.println(aa);
    //String bb = String(mpu.getGyroX()) + "," + String(mpu.getGyroY()) + "," + String(mpu.getGyroZ());
    //HM10.println(bb);
    //String cc = String(mpu.getAngleX()) + "," + String(mpu.getAngleY()) + "," + String(mpu.getAngleZ());
    //HM10.println(cc);
    //String dd = String(mpu.getAccAngleX()) + "," + String(mpu.getAccAngleY());
    //HM10.println(dd);
    
    //timer = millis();
    //String time1 = "," + String(timer); 
    //HM10.println(time1);
    HM10.print(String(mpu.getAccY()) + "," + String(mpu.getAngleZ()) + ",");
    if(mpu.getAccY() > 0.2){
      num1 = 1;
      count1 = count1 + 1;
      if(count1 > 1){
        num1 = 1;
      }
    }
    if(mpu.getAccY() < -0.3 && num1 == 1){
      num2 = 2;
      count2 = count2 + 1;
      acc2 = mpu.getAccY();
      if(count2 > 1){
        num2 = 2; 
      }
    }
    if(mpu.getAccY() > 0.2 && num2 == 2){
      num3 = 3;
      count3 = count3 + 1;
      acc1 = mpu.getAccY();
      if(count3 > 1){
        num3 = 3;
      }
    }
    if(mpu.getAccZ() > 1.4){
      num4 = 1;
      count4 = count4 + 1;
      if(count4 > 1){
        num4 = 1;
        }
      }
    if(mpu.getAccZ() < 0.8 && num4 == 1){
      num5 = 2;
      count5 = count5 + 1;
      if(count5 > 1){
        num5 = 2;
        }
      }
    if(num1 == 1 && num2 == 2 && num3 == 3 && num4 == 1 && num5 == 2){
      HM10.print("c1,");
      used = 1;
      num1 = 0;
      num2 = 0;
      num3 = 0;
      num4 = 0;
      num5 = 0;
      count1 = 0;
      count2 = 0;
      count3 = 0;
      count4 = 0;
      count5 = 0;
    }else{
      HM10.print("c,");
      used = 0;}

    
    if(mpu.getAccX() >= 2 || mpu.getAccX() <= -2){
      be = ti;
      if(mpu.getAccX() >= 2 || mpu.getAccX() <= -2){
        
        if(mpu.getAccX() >= 2 || mpu.getAccX() <= -2){
          be1 = ti;
          be2 = be1 - be;
          if(be2 < 1000){
            HM10.print("af");
          }
        }
      }
    }else{
      HM10.print("a,");
      }

    if(used == 1){
      acc3 = acc1 + acc2;
      HM10.print("g" + String(pow(acc3, 1/4)));
      Serial.print("g" + String(pow(acc3, 1/4)));
      }else{
        HM10.print("g");}
    
    delay(20);
  }
}
