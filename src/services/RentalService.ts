import * as nodemailer from 'nodemailer';
import * as moment from 'moment';
import * as aws from 'aws-sdk';
import {v1 as uuidv1} from 'uuid';
import RentalDTO from '../model/RentalDTO';


export default class RentalService {
    private static _instance: RentalService;
    private _transporter: nodemailer.Transporter;
    private _rentalDTO: RentalDTO;

    public static getInstance(): RentalService {
        if(!this._instance) {
            this._instance = new RentalService();
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
        const customerInfo = this._rentalDTO.CustomerInfo;
        const paymentInfo = this._rentalDTO.PaymentInfo;
        const paybackInfo = this._rentalDTO.PaybackInfo;
        const productInfo = this._rentalDTO.ProductInfo;

        let body = `<html><head></head><body>
            <h2>가전 렌탈 가입 신청서</h2>

            <h3>신청서 정보</h3>
            작성 시간 : ${moment().format("YYYY년 MM월 DD일 HH시 mm분 ss초")} <br>
            신청서 ID : ${uuidv1()} <br>

            <h3>가입자 정보</h3>
            가입자명 : ${customerInfo.name}<br>
            생년월일 : ${customerInfo.birthday}<br>
            휴대폰 : ${customerInfo.mobileCarrier} ${customerInfo.mobileNumber} (${customerInfo.mobileAuth ? '본인': '본안아님'}) <br>
            주소 : ${customerInfo.zipCode} ${customerInfo.address} ${customerInfo.address2}<br>
            약관 동의 : <input type="checkbox" checked="${this._rentalDTO.AgreeContrat ? 'checked' : ''}"><br>
            
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
        약정 기간 : ${productInfo.countractDue} <br>
        가입 회사 : ${productInfo.vendor.join(' ')} <br>
        가입 상품 : ${productInfo.types.join(' ')} <br>`;
        
        body += `<h3>요청사항</h3>
        ${this._rentalDTO.Remarks}
        </body></html>`;

        return body;
    }

    public setRentalDTO(registerDTO: RentalDTO) {
        this._rentalDTO = registerDTO;
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
            const customerInfo = this._rentalDTO.CustomerInfo;

            const mailOptions = {
                from: options.from,
                to: options.to,
                subject: `[모바일 고객센터] ${customerInfo.mobileNumber} (${customerInfo.name} 님) 가전 렌탈 가입신청서`,
                html: this.getMailBody()
            };

            this._transporter.sendMail(mailOptions, (error: any, info: any) => {
                if(error) {
                    console.log(JSON.stringify(error));
                    return reject(error);
                }
                return resolve(info);
            });
        });
    }
}