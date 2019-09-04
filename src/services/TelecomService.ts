import * as nodemailer from 'nodemailer';
import * as moment from 'moment';
import * as aws from 'aws-sdk';
import {v1 as uuidv1} from 'uuid';
import TelecomDTO from '../model/TelecomDTO';

export default class TelecomService {
    private static _instance: TelecomService;
    private _transporter: nodemailer.Transporter;
    private _telecomDTO: TelecomDTO;

    public static getInstance(): TelecomService {
        if(!this._instance) {
            this._instance = new TelecomService();
        }

        return this._instance;
    }

    private constructor() {
        this._transporter = nodemailer.createTransport({
            SES: new aws.SES({
                apiVersion: '2010-12-01'
            })
        });
    }

    private getMailBody(): string {
        const customerInfo = this._telecomDTO.CustomerInfo;
        const paymentInfo = this._telecomDTO.PaymentInfo;
        const paybackInfo = this._telecomDTO.PaybackInfo;
        const productInfo = this._telecomDTO.ProductInfo;
        const telephoneInfo = this._telecomDTO.PrevTelephoneContractInfo;
        const commodityInfo = this._telecomDTO.CombinationCommodityInfo;

        let body = `<html><head></head><body>
            <h2>${this._telecomDTO.vendor} 가입 신청서</h2>

            <h3>신청서 정보</h3>
            작성 시간 : ${moment().utcOffset(9).format("YYYY년 MM월 DD일 HH시 mm분 ss초")} <br>
            신청서 ID : ${uuidv1()} <br>

            <h3>가입자 정보</h3>
            가입자명 : ${customerInfo.name}<br>
            주민번호 : ${customerInfo.securityNumber.substr(0, 6)}-${customerInfo.securityNumber.substr(6)} <input type="checkbox" ${(parseInt(customerInfo.securityNumber[6], 10) > 4) ? 'checked' : ''}> 외국인 <br>
            휴대폰 : ${customerInfo.mobileCarrier} ${customerInfo.mobileNumber} (${customerInfo.mobileAuth ? '본인': '본인아님'}) <br>
            비상연락처 : ${customerInfo.emgencyNumber} <br>
            이메일 : ${customerInfo.email} <br>
            주소 : ${customerInfo.zipCode} ${customerInfo.address} ${customerInfo.address2}<br>
            약관 동의 : <input type="checkbox" ${this._telecomDTO.AgreeContrat ? 'checked' : ''}><br>
            
            <h3>납부 정보 (${paymentInfo.paymentMethod})</h3>`;
        
        if(paymentInfo.paymentMethod === '계좌이체') {
            body += `${paymentInfo.bankName} : ${paymentInfo.accountNumber} <br>
            예금주 : ${paymentInfo.accountHoler} <br>`;
        } else {
            body += `${paymentInfo.cardName} : ${paymentInfo.cardNumber} (${paymentInfo.cardExpirationDate}) <br>
            카드주 : ${paymentInfo.cardHolder} <br>`;
        }

        body+= `<h3>사은품 정보</h3>
        상품권 종류 : ${paybackInfo.giftCardName} <br>
        계좌번호 : <${paybackInfo.bankName}> ${paybackInfo.accountNumber} <br>
        예금주 : ${paybackInfo.accountHolder} <br>

        <h3>상품 정보</h3>
        약정 기간 : ${productInfo.countractDue} <br>`;

        if(productInfo.internet && productInfo.internet !== '') {
            body += `인터넷 상품 : ${productInfo.internet} <br>`;
        }

        if(productInfo.tv && productInfo.tv !== '') {
            body += `TV 상품 : ${productInfo.tv} <br>`;
        }

        if(productInfo.tvAdd && productInfo.tvAdd !== '') {
            body += `TV 추가설치 : ${productInfo.tvAdd} <br>`;
        }
        
        if(productInfo.settoppBox && productInfo.settoppBox !== '') {
            body += `셋텁박스 상품 : ${productInfo.settoppBox} <br>`;
        }
        
        if(productInfo.wireless && productInfo.wireless !== '') {
            body += `WiFi 상품 : ${productInfo.wireless} <br>`;
        }

        if(productInfo.telephone && productInfo.telephone !== '') {
            body += `전화 상품 : ${productInfo.telephone} <br>`;

            if(telephoneInfo.carrierMoveCheck) {
                body += `기존 통신사 : ${telephoneInfo.carrier} <br>
                기존 전화번호 : ${telephoneInfo.phoneNumber} <br>
                번호이동 인증: ${telephoneInfo.authMethod}(${telephoneInfo.authCode}) <br>`;
            }
        }

        if(commodityInfo && commodityInfo.CombinationOption !== '') {
            body += `<h3>결합 정보</h3>`;
            body += `가족 內 결합 : ${commodityInfo.CombinationOption}<br>`;
        }

        body += `<h3>요청사항</h3>
        ${this._telecomDTO.Remarks}
        </body></html>`;

        return body;
    }

    public setTelecomDTO(telecomDTO: TelecomDTO) {
        this._telecomDTO = telecomDTO;
    }

    public async verifyConnection() {
        return new Promise((resolve, reject) => {
            this._transporter.verify(function(error, success) {
                if (error) {
                    console.log(error);
                    reject();
                } else {
                    resolve(success);
                }
            });
        })
    }

    public async sendEmail(options: {from: string, to: string}): Promise<any> {
        if(!this._transporter) return;

        return new Promise((resolve, reject) => {
            const customerInfo = this._telecomDTO.CustomerInfo;

            const mailOptions = {
                from: options.from,
                to: options.to,
                subject: `[모바일 고객센터] ${customerInfo.mobileNumber} (${customerInfo.name} 님) ${this._telecomDTO.vendor} 가입신청서`,
                html: this.getMailBody()
            };

            this._transporter.sendMail(mailOptions, (error: any, info: any) => {
                if(error) {
                    return reject(error);
                }
                console.log(mailOptions);
                return resolve(info);
            });
        });
    }
}