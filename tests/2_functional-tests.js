const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

//Create an issue with every field: POST request to /api/issues/{project}
//Create an issue with only required fields: POST request to /api/issues/{project}
//Create an issue with missing required fields: POST request to /api/issues/{project}
//View issues on a project: GET request to /api/issues/{project}
//View issues on a project with one filter: GET request to /api/issues/{project}
//View issues on a project with multiple filters: GET request to /api/issues/{project}
//Update one field on an issue: PUT request to /api/issues/{project}
//Update multiple fields on an issue: PUT request to /api/issues/{project}
//Update an issue with missing _id: PUT request to /api/issues/{project}
//Update an issue with no fields to update: PUT request to /api/issues/{project}
//Update an issue with an invalid _id: PUT request to /api/issues/{project}
//Delete an issue: DELETE request to /api/issues/{project}
//Delete an issue with an invalid _id: DELETE request to /api/issues/{project}
//Delete an issue with missing _id: DELETE request to /api/issues/{project}
let deleteID;
suite('Functional Tests', function() {
    suite('Routing Test', function () {
    suite('3 Post request Tests', function () {
    test('Create an issue with every field: POST request to /api/issues/{project}', function (done) {
        chai 
        .request(server)
        .post('/api/issues/projects')
        .set('content-type', 'application/json')
        .send ({
            issue_title: 'issue', 
            issue_text: 'Functional Test',
            created_by: 'fcc',
            assigned_to: 'Dom',
            status_text: 'Not Done',
        })
        .end(function (err, res) {
            assert.equal(res.status, 200);
            deleteID = res.body._id;
            assert.equal(res.body.issue_title ,'issue');
            assert.equal(res.body.assigned_to ,'Dom');
            assert.equal(res.body.created_by ,'fcc');
            assert.equal(res.body.status_text ,'Not Done');
            assert.equal(res.body.issue_text ,'Functional Test');
            done();
        });
    });
    test('create an issue with only required fields: POST request to /api/issues/{project}', function (done) {
        chai
        .request(server)
        .post('/api/issues/projects')
        .set('content-type', 'application/json')
        .send ({
            issue_title: 'Issue', 
            issue_text: 'Functional Test',
            created_by: 'fcc',
            assigned_to: '',
            status_text: '',
        })
        .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.issue_title, 'Issue');
            assert.equal(res.body.assigned_to, '');
            assert.equal(res.body.created_by , 'fcc');
            assert.equal(res.body.status_text, '');
            assert.equal(res.body.issue_text, 'Functional Test');
            done();
          });
});
    test('create an issue with missing required fields: POST request to /api/issues/{project}', function (done) {
       chai
        .request(server)
        .post('/api/issues/projects')
        .set('content-type', 'application/json')
        .send ({
            issue_title: '', 
            issue_text: '',
            created_by: 'fcc',
            assigned_to: '',
            status_text: '',
        })
        .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.error,'required field(s) missing');
            done();
        });
    });
  }); 

    ////////////////////////// GET REQUEST TEST ////////////////////////
    
suite('3 Get request Tests', function () {
    test('View issues on a project: GET request to /api/issues/{project}', function (done) {
        chai
         .request(server)
         .get('/api/issues/test-data-abc123')
         .end( function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.length, 4);
            done();
         });
});
     test('View issues on a project with one filter: GET request to /api/issues/{project}', function (done) {
        chai
        .request(server)
        .get('/api/issues/test-data-abc123')
        .query ({
         _id: '62df2b004b7997e9f69e529e',
})
    .end(function(err, res) {
    assert.equal(res.status, 200);
    assert.deepEqual(res.body[0], {
       _id: '62df2b004b7997e9f69e529e',
       issue_title: 'something', 
       issue_text: 'ssss',
        created_on: '2022-07-25T23:45:04.075Z',
        updated_on: '2022-07-25T23:45:04.075Z',
        created_by: 'muchi',
        assigned_to: '',
        open: true,
        status_text: ''
    });
    done();
 });
});
test('View issues on a project with multiple filters: GET request to /api/issues/{project}', function (done) {
            chai
         .request(server)
         .get('/api/issues/test-data-abc123')
         .end( function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.length, 4);
            done();
         });
});
}); 
/////////////////////// Put Request test ////////////////////

    suite('5 Put request Tests', function () {
        test('Update one field on an issue: PUT request to /api/issues/test-data-put', function (done) {
            chai
            .request(server)
            .put('/api/issues/test-data-put')
            .send({
                _id: '62df2d0a52a5c9554c071d3d',
                issue_title: 'gggg',
            })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.result, 'successfully updated');
                assert.equal(res.body._id, '62df2d0a52a5c9554c071d3d');

                done();
            });
        });
        test('Update multiple fieleds on an issue: PUT request to /api/issues/{project}', function (done) {
            chai
            .request(server)
            .put('/api/issues/test-data-put')
            .send({
                _id: '62df2d0a52a5c9554c071d3d',
                issue_title: 'gggg',
                issue_text: 'gggg',
         })
         .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.result, 'successfully updated');
            assert.equal(res.body._id, '62df2d0a52a5c9554c071d3d');

            done();
    });
});
test('Update an issue with missing _id: PUT request to /api/issues/{project}', function (done) {
    chai
    .request(server)
    .put('/api/issues/test-data-put')
    .send({
        issue_title: 'update',
        issue_text: 'update',
 })
 .end(function (err, res) {
    assert.equal(res.status, 200);
    assert.equal(res.body.error, 'missing _id');

    done();
});
});
test('Update an issue with no fields to update: PUT request to /api/issues/{project}', function (done) {
    chai
    .request(server)
    .put('/api/issues/test-data-put')
    .send({
        _id: '62d2fc483252cd4fda82a22c',
  })
 .end(function (err, res) {
    assert.equal(res.status, 200);
    assert.equal(res.body.error, 'no update field(s) sent');

    done();
});
});
test('Update an issue with an invalid  _id: PUT request to /api/issues/{project}', function (done) {
    chai
    .request(server)
    .put('/api/issues/test-data-put')
    .send({
        _id: '62d2f88e8df31a588invalid',
        issue_title: 'update',
        issue_text: 'update',
  })
 .end(function (err, res) {
    assert.equal(res.status, 200);
    assert.equal(res.body.error, 'could not update');

    done();
});
});
});

//////////////////////// DELETE TESTS //////////////////////

suite('3 DELETE request Tests', function () {
    test('Delete an issue: DELETE request to /api/issues/projects', function (done) {
        chai
        .request(server)
        .delete('/api/issues/projects')
        .send({
            _id: 'deleteID',
        })
        .end(function (err, res) {
            assert.equal(res.status, 200);
           // assert.equal(res.body.result, 'successfully deleted');

            done();
        });
    });
    test('Delete an issue with an invalid _id: DELETE request to /api/issues/{project}', function (done) {
        chai
        .request(server)
        .delete('/api/issues/projects')
        .send({
            _id: '62d1f77d8bac2c6d6invalid',
     })
     .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'could not delete');

        done();
     });
    });
    test('Delete an issue with  missing _id: DELETE request to /api/issues/{project}', function (done) {
        chai
        .request(server)
        .delete('/api/issues/projects')
        .send({})
     .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'missing _id');

        done();
     });
    });
   });
  });
});