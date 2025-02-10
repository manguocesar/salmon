export default function Contact() {
    return (
        <div className="max-w-2xl text-black mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-center">Contact Us</h1>
            <div className="bg-white p-8 rounded-lg shadow-md">
                <p className="mb-6">For inquiries or to place an order, please contact Mikael Hertz directly:</p>
                <ul className="space-y-2 mb-6">
                    <li>
                        <strong>Phone:</strong> +33 1 23 45 67 89
                    </li>
                    <li>
                        <strong>Email:</strong> mikael.hertz@example.com
                    </li>
                    <li>
                        <strong>Address:</strong> 123 Rue de la Poissonnerie, 69000 Lyon, France
                    </li>
                </ul>
                <p className="mb-6">
                    We deliver our premium smoked and farmed fish products in the Lyon area before Christmas and Easter.
                </p>
                <p>
                    Don't hesitate to reach out for any questions about our products or to place your order. We're here to provide
                    you with the finest quality fish for your culinary delights!
                </p>
            </div>
        </div>
    )
}

