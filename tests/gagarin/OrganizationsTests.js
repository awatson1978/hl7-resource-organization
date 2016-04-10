describe('clinical:hl7-resources-organizations', function () {
  var server = meteor();
  var client = browser(server);

  it('Organizations should exist on the client', function () {
    return client.execute(function () {
      expect(Organizations).to.exist;
    });
  });

  it('Organizations should exist on the server', function () {
    return server.execute(function () {
      expect(Organizations).to.exist;
    });
  });

});
