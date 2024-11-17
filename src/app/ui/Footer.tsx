export default function Footer() {
  return (
    <footer className="w-full py-4 mt-auto bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex justify-center text-sm text-gray-500 dark:text-gray-400">
          <a 
            href="https://beian.miit.gov.cn/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            京ICP备2024094904号-1
          </a>
        </div>
      </div>
    </footer>
  );
} 