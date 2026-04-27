import Link from "next/link";

export default function Bekræftelse() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Tak for din bestilling!
        </h1>
        <p className="text-gray-500 mb-6">
          Vi har modtaget din ordre og er i gang med at tilberede den.
          Leveringstid ca. 30-45 minutter.
        </p>
        <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 mb-6 text-sm text-orange-700">
          Du modtager en bekræftelse så snart ordren er behandlet.
        </div>
        <Link
          href="/"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full transition-colors"
        >
          Tilbage til forsiden
        </Link>
      </div>
    </main>
  );
}
