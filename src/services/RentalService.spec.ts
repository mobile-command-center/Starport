import * as AWS from 'aws-sdk';
import * as nodemailer from 'nodemailer';
import RegisterService from './RentalService';
import RentalFormData from '../model/RentalFormData';
import RentalDTO from '../model/RentalDTO';
import RentalService from './RentalService';

const LGSampleData: RentalFormData = {
    c_name: '테스트',
    c_tel2_type: 'LG',
    c_tel21: '010',
    c_tel22: '9312',
    c_tel23: '5123',
    g_auth: 'true',
    c_zipcode1: '463',
    c_zipcode2: '894',
    c_address: '경기 수원시 영통구 덕영대로 1503 (영통동)',
    c_address2: '411동 104호',
    c_jumin1: '190128',
    c_gender: '남',
    g_payment_method: '계좌이체',
    g_bank_cd: '4',
    g_bank_no: '620-209007-853',
    g_bank_holder: '테스트',
    g_card_cd: '14',
    g_card_no: '123123',
    g_card_gigan: '11',
    g_card_gigan1: '2',
    g_card_holder: '김진구',
    g_sp_giftcard_code: '1',
    content_copy: 'Y',
    g_sp_bank_code: '4',
    g_sp_bank_acount: '620-209007-853',
    g_sp_bank_holder: '테스트',
    p_vendor: [ 'LG', '' ],
    p_product: [ '정수기', '공기청정기', '' ],
    p_product_name: '(정수기)WD502AS, (건조기)RH16WC',
    p_product_color: '(정수기)그레이',
    p_promise: '3년약정',
    g_bigo: '',
    w_agree: 'true' 
}

AWS.config.region = 'us-west-2';

describe('RentalService Service', () => {
    let rentalService: RentalService;

    before(function(done) {
        this.timeout(0); //before일때만 timeout 제한이 없음

        nodemailer.createTestAccount((err) => {
            if(err) {
                done(err);
            }
            rentalService = RegisterService.getInstance();
            done();
        });
    });

    it('verify SMTP connection', done => {
        rentalService.verifyConnection().then(()=> {
            done();
        });
    }).timeout(5000);

    it('send email', done => {
        const mailOptions = {
            from: 'support@ajungweb.co.kr',
            to: 'myraous@gmail.com',
        };

        rentalService.setRentalDTO(new RentalDTO(LGSampleData));
        rentalService.sendEmail(mailOptions).then((info) => {
            console.log(info);
            done();
        });
    }).timeout(5000);
})