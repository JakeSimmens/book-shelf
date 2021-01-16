const testApp = require("../app");
const request = require("supertest");
const axios = require("axios");

jest.mock("../seed.js");  //stop seed from running
jest.mock("axios");
let mockMongoAPI = jest.mock("../database", () => {

    function createMongoAPI(database, collection){

        let findMany = jest.fn((term, callback) => {callback([])});
        let insert = jest.spy((data, callback) => {callback()});

        let publicAPI = {
            findMany,
            insert
        }
        return publicAPI;
    }
    return {createMongoAPI};
});

describe("Route /findBook", () => {
    afterAll(done => {
        testApp.server.close();
        done();
    });

    let dataOfBook = {
        kind: 'books#volume',
        id: '6KTPirqYw5wC',
        etag: 'UBJWt4Ist4Q',
        selfLink: 'https://www.googleapis.com/books/v1/volumes/6KTPirqYw5wC',
        volumeInfo: {
          title: 'Theatre Sound',
          authors: [ 'John A. Leonard' ],
          publisher: 'Psychology Press',
          publishedDate: '2001',
          description: 'Theatre Sound includes a brief history of the use of sound in the theatre, discussions of musicals, sound effects, and the recording studio, and even an introduction to the physics and math of sound design. A bibliography and online reference section make this the new essential work for students of theatre and practicing sound designers.',
          industryIdentifiers: [ [Object], [Object] ],
          readingModes: { text: false, image: true },
          pageCount: 203,
          printedPageCount: 212,
          dimensions: { height: '23.00 cm', width: '16.70 cm', thickness: '1.20 cm' },
          printType: 'BOOK',
          categories: [ 'Performing Arts / Theater / General' ],
          maturityRating: 'NOT_MATURE',
          allowAnonLogging: false,
          contentVersion: '0.0.2.0.preview.1',
          panelizationSummary: { containsEpubBubbles: false, containsImageBubbles: false },
          imageLinks: {
            smallThumbnail: 'http://books.google.com/books/content?id=6KTPirqYw5wC&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE71liIj3ikvhanwwgMWMmx1-FN0rSupF9hAOvVpT_N6xR4Mw_aF7SG77hISfyRwfTRFGvVwq3rYxKj4H_jyoiu6i4S9YfZZh2Sju7ZFolD-HLO8vSIYF2kK2kpC64z-AiMeLH4-I&source=gbs_api',
            thumbnail: 'http://books.google.com/books/content?id=6KTPirqYw5wC&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE71v_xRDnCTBJM25qZqy4Tsfrxgb6y2v4Gw9ptVGc4IH0O2_RR_2D-BAHybokmJ-I0Ld3BtYFQ63E_PYeTlYnZRKb6oq8jjrmso8rN2DD_XVTCtNCcgtVzQojJEn1mXfke_X_O8M&source=gbs_api',
            small: 'http://books.google.com/books/content?id=6KTPirqYw5wC&printsec=frontcover&img=1&zoom=2&edge=curl&imgtk=AFLRE72ZDkpcAim3oWUNxpcWl5K7bWyZliAEk5Z0q6zKkFUs7N59PdIoszS6tEPqFjCkjvpEcPjkX32w5xXrrZdX1maW-mFtmXTWBUVpSezjqrM3jELDw30_oFDZMNyZ7QSLgbyJmSyW&source=gbs_api',
            medium: 'http://books.google.com/books/content?id=6KTPirqYw5wC&printsec=frontcover&img=1&zoom=3&edge=curl&imgtk=AFLRE72XCOUWiatsLpMQ5VdFfTKhvSpjePd5ynw4IkKklLhFzGNeskYshaWql3pqWPxy3jGM9nopiPqgYmAjj-2wFPAVoDGHu18I5ce82zv8m39gFCeAODRoASus6OdC3--4ZJYmR1WI&source=gbs_api',
            large: 'http://books.google.com/books/content?id=6KTPirqYw5wC&printsec=frontcover&img=1&zoom=4&edge=curl&imgtk=AFLRE72NWBaa530EoXlh6mJOOg39t0PEKRzPY2L7ObcsSeMwfVkaZ5cw5MCBSezXNXgM01wvkHOl5wQ0FN6e2GrlISPVLWEOYYU5FubQdKH1p97wl1cKEAwCItpkzvUBapycEjz8f0Do&source=gbs_api'
          },
          language: 'en',
          previewLink: 'http://books.google.com/books?id=6KTPirqYw5wC&hl=&source=gbs_api',
          infoLink: 'https://play.google.com/store/books/details?id=6KTPirqYw5wC&source=gbs_api',
          canonicalVolumeLink: 'https://play.google.com/store/books/details?id=6KTPirqYw5wC'
        },
        saleInfo: { country: 'US', saleability: 'NOT_FOR_SALE', isEbook: false },
        accessInfo: {
          country: 'US',
          viewability: 'PARTIAL',
          embeddable: true,
          publicDomain: false,
          textToSpeechPermission: 'ALLOWED',
          epub: { isAvailable: false },
          pdf: { isAvailable: false },
          webReaderLink: 'http://play.google.com/books/reader?id=6KTPirqYw5wC&hl=&printsec=frontcover&source=gbs_api',
          accessViewStatus: 'SAMPLE',
          quoteSharingAllowed: false
        }
      };

    it("should request a book by :id from Google Books", async () => {
        axios.get.mockImplementationOnce(() => Promise.resolve({status: 200, data: dataOfBook}));
        await request(testApp)
            .get("/findBook/123456")
            .expect(200)
    });

    it("should redirect non-existant bookID to '/'", async () => {
        axios.get.mockImplementationOnce( () => Promise.resolve({status: 503}));
        let response = await request(testApp)
            .get("/findBook/123fake456")
            .expect(302)

        expect(response.header.location).toBe("/");
    });


    it("should POST a GoogleBookID and redirect to '/'", async () => {


        axios.get.mockImplementationOnce( () => Promise.resolve({status: 200, data: dataOfBook}));
        let response = await request(testApp)
            .post("/findBook")
            .expect(302)

        expect(response.header.location).toBe("/");
    });

    it("should fail to POST a bad Google BookID and redirect to '/'", async () => {
        axios.get.mockImplementationOnce( () => Promise.resolve({status: 503}));
        let response = await request(testApp)
            .post("/findBook")
            .expect(302)

        expect(response.header.location).toBe("/");
    });


});