# read_components.py
import os

# pad naar de components folder
components_dir = './components'
output_file = 'answers.txt'

with open(output_file, 'w', encoding='utf-8') as out:
    for root, dirs, files in os.walk(components_dir):
        for file in sorted(files):
            file_path = os.path.join(root, file)
            out.write(f"{'='*80}\n")
            out.write(f"File: {file_path}\n")
            out.write(f"{'='*80}\n\n")
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                out.write(content)
                out.write("\n\n")
print(f"All components have been written to {output_file}")