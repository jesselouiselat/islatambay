function Footer() {
  return (
    <footer className="py-4 mt-5">
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-md-6">
            <h5>Islatambay</h5>
            <p className="small">
              © {new Date().getFullYear()} Islatambay. All rights reserved.
            </p>
            <p className="small">
              Developed by{" "}
              <a
                href="https://github.com/jesselouiselat"
                className="text-decoration-none"
              >
                AzsibA
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
