import { languages } from '../services/language'
import { languageStore } from '../store/screen'

export const SelectLanguage = () => {
    
    const handleChange = (e: any) => {
        languageStore.set(e.target.value)
    }
    
    return (
        <section className="flex justify-around text-white bg-blue-500">
            Selecciona el idioma:
            <select 
                name="language" 
                className="block py-1 text-sm text-white bg-blue-500 border-0 border-gray-200 focus:outline-none focus:ring-0 focus:border-gray-200"
                onChange={(e) => handleChange(e)} 
            >
                {
                    languages.map(language => (
                        <option 
                            key={language.iso} 
                            value={language.name}
                            className='bg-blue-500'
                        >
                                {language.name}
                        </option>
                    ))
                }
            </select>
        </section>    
    )
}