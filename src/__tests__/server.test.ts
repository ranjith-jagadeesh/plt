import { ExpressServer } from "../server";
import request from "supertest";

const app = new ExpressServer().app

describe('Express Server', () => {
    it('Get Stock Info', async () => {
        const sku = "SXV420098/71/68"
        const res = await request(app).get(`/?sku=${sku}`);
    
        expect(res.statusCode).toEqual(200);
        const body = JSON.parse(res.text);
        expect(body.sku).toEqual(sku);
        expect(body.qty).toEqual(706)
    })

    it('Send request without query parameters', async () => {
        const res = await request(app).get(`/`);

        expect(res.statusCode).toEqual(400);
        const body = JSON.parse(res.text);
        expect(body.message).toEqual(
          "Invalid Request, Enter SKU to get stock information"
        );
    })
})